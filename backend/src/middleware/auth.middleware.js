// import jwt from "jsonwebtoken";



// export const authMiddleware = (req, res, next) => {
//     const SECRET = process.env.JWT_SECRET;
//     const token = req.headers.authorization?.split(" ")[1]

//     try {
//         // verify the token 
//         const decoded = jwt.verify(token, SECRET);
//         res.user = decoded

//         next();
//     } catch {
//         return res.status(401).json({message: "Invalide token"})
//     }
// };

import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token" });

  const SECRET = process.env.JWT_SECRET

  const decoded = jwt.verify(token, SECRET);

  req.user = decoded; // contains userId + tenantId
  next();
};