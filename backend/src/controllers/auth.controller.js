// import bcrypt from "bcrypt"
// import jwt from "jsonwebtoken"

// import { registerSchema, loginSchema } from "../validators/auth.validator.js"

// // Later saved to the DB: {email: "", password: ""}
// const users = []


// export const register = async (req, res, next) => {
//     try {
//         const parsed = registerSchema.parse(req.body);

//         const email = parsed.email.toLowerCase();
//         const { password } = parsed;

//         const existing = users.find(u => u.email === email);

//         if (existing) {
//             return res.status(409).json({ message: "User already exists" });
//         }

//         const hashed = await bcrypt.hash(password, 10);

//         users.push({ email, password: hashed });

//         return res.status(201).json({ message: "Registered successfully!" });

//     } catch (err) {
//         next(err);
//     }
// };
// export const login = async (req, res, next) => {
//     try {
//         const SECRET = process.env.JWT_SECRET
//         const parsed = loginSchema.parse(req.body);

//         const {email, password} = parsed

//         // check user by email
//         const existing = users.find(u => u.email === email)

//         console.log(existing)
//         console.log(password)

//         if (!existing) {
//             return res.status(404).json({message: "User not found."})
//         }

//         const pwdHash = existing.password

//         // check the password hash
//         const isValidPwd = await bcrypt.compare(password, pwdHash)

//         console.log(isValidPwd)

//         if (!isValidPwd) return res.status(404).json({message: "Invalid credential."});

//         // if (isValidPwd) return res.status(200).json({message: "Login Successful"});

//         const jwtToken = jwt.sign({email: email}, SECRET, {expiresIn: "1d"})

//         return res.status(200).json({token: jwtToken})
//         // create jwt token and send it

//     } catch (err){
//         next(err)
//     }
// };

// export const profile = (req,res) => {
//     return res.status(200).json({user: res.user})
// };


import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

export const register = async (req, res) => {
  const { email, password} = req.body;

  const tenantId = "tenant_" + uuidv4(); // unique tenant
  const user = await User.create({ email, password, tenantId });

  const { password: _, ...safeUser} = user.toObject();

  res.json(safeUser);
};

export const login = async (req, res) => {
  const { email, password, tenantId } = req.body;

  const user = await User.findOne({ email, password });

  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const SECRET = process.env.JWT_SECRET

  const token = jwt.sign(
    { userId: user._id, tenantId: user.tenantId },
    SECRET
  );

  res.json({ token });
};