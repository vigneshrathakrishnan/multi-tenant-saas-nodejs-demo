import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";

// export const createOrder = async (req, res) => {
//   const { email, item, price } = req.body;

//   // Find user inside same tenant
//   const user = await User.findOne({
//     email,
//     tenantId: req.user.tenantId
//   });

//   if (!user) {
//     return res.status(404).json({ message: "User not found in this tenant" });
//   }

//   // Create order for that user
//   const order = await Order.create({
//     item,
//     price,
//     userId: user._id,
//     tenantId: req.user.tenantId
//   });

//   res.json(order);
// };

export const createOrder = async (req, res) => {
  try {
    const data = req.body;

    // BULK ORDERS
    if (Array.isArray(data)) {
      // Get all emails from payload
      const emails = data.map(o => o.email);

      // Fetch users in one query (OPTIMIZED)
      const users = await User.find({
        email: { $in: emails },
        tenantId: req.user.tenantId
      });

      // Map email → user
      const userMap = {};
      users.forEach(u => {
        userMap[u.email] = u;
      });

      // Prepare orders
      const orders = data.map(order => {
        const user = userMap[order.email];

        if (!user) {
          throw new Error(`User not found: ${order.email}`);
        }

        return {
          item: order.item,
          price: order.price,
          userId: user._id,
          tenantId: req.user.tenantId
        };
      });

      const createdOrders = await Order.insertMany(orders);

      return res.json(createdOrders);
    }

    // SINGLE ORDER
    const { email, item, price } = data;

    const user = await User.findOne({
      email,
      tenantId: req.user.tenantId
    });

    if (!user) {
      return res.status(404).json({ message: "User not found in this tenant" });
    }

    const order = await Order.create({
      item,
      price,
      userId: user._id,
      tenantId: req.user.tenantId
    });

    res.json(order);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Something went wrong" });
  }
};

export const getOrders = async (req, res) => {
  const orders = await Order.find({
    tenantId: req.user.tenantId
  }).populate("userId", "email");

  res.json(orders);
};