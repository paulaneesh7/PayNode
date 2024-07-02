import z from "zod";
import jwt from "jsonwebtoken";
import { Account, User } from "../models/schema.js";

const { JWT_SECRET } = process.env;

const signupBody = z.object({
  username: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.number(),
});

const signinBody = z.object({
  username: z.string().email(),
  password: z.number(),
});

const updateBody = z.object({
  password: z.number().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

/* Sign-up */
export const userSignup = async (req, res) => {
  const { success, data } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({ message: "Incorrect Input" });
  }

  const { username, firstName, lastName, password } = data;

  const existingUser = await User.findOne({
    username,
  });
  if (existingUser) {
    return res.status(411).json({ message: "User with email already exists" });
  }

  try {
    const newUser = new User({ username, firstName, lastName, password });
    const savedUser = await newUser.save();

    const userId = savedUser._id;

    /// ----- Create new account (Providing a random balance to the new account creator) ------

    await Account.create({
      userId,
      balance: 1 + Math.random() * 10000,
    });

    const token = jwt.sign({ userId }, JWT_SECRET);

    return res
      .status(200)
      .json({ message: "User created successfully", token: token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/* Sign-in */
export const userSignin = async (req, res) => {
  const { success, data } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({ message: "Incorrect inputs" });
  }

  try {
    const { username, password } = data;

    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      return res.status(200).json({ token });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/* User update information */
export const userUpdateInfo = async (req, res) => {
  const { success, data } = updateBody.safeParse(req.body);

  if (!success) {
    return res
      .status(411)
      .json({ message: "Error while updating information" });
  }

  try {
    const { password, firstName, lastName } = data;
    await User.updateOne(
      { _id: req.userId },
      { password, firstName, lastName }
    );

    return res.status(200).json({
      message: "Updated successfully",
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/* User Retrieve  */
export const userRetrieve = async (req, res) => {
  const filter = req.query.filter || "";

  try {
    const users = await User.find({
      $or: [
        {
          firstName: {
            $regex: filter,
          },
        },
        {
          lastName: {
            $regex: filter,
          },
        },
      ],
    });

    return res.status(200).json({
      user: users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
