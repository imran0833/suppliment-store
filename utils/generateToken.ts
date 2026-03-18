import jwt from "jsonwebtoken";      

export function generateToken(user: any) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );
}