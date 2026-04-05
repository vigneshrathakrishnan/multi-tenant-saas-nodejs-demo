import {User} from "../models/user.model.js"

// export const createUser = async (req, res) => {
//   const user = await User.create({
//     ...req.body,
//     tenantId: req.user.tenantId
//   })

//   res.json(user)
// }

export const createUser = async (req, res) => {
  try {
    const data = req.body;

    // If array → bulk insert
    if (Array.isArray(data)) {
      const users = data.map(user => ({
        ...user,
        tenantId: req.user.tenantId
      }));

      const createdUsers = await User.insertMany(users);

      return res.json(createdUsers);
    }

    // Single user
    const user = await User.create({
      ...data,
      tenantId: req.user.tenantId
    });

    res.json(user);

  } catch (err) {
    console.error(err);

    // Handle duplicate error (optional)
    if (err.code === 11000) {
      return res.status(400).json({ message: "Duplicate user detected" });
    }

    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getUsers = async (req, res) => {
  const users = await User.find({
    tenantId: req.user.tenantId,
    _id: { $ne: req.user.userId } // exclude self
  }).select("-password")

  res.json(users)
}