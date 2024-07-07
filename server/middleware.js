import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Authentication issue" });
  }

  const token = authHeader.split(" ")[1]; // extracting out the token from auth-header

  // verifying the user and setting the user in request after verification
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.userId = decoded.userId;

    next();
  } catch (err) {
    return res.status(403).json({ error: err.message });
  }
};
