import Users from "../models/UserModel";

import mongoose from "mongoose";
import catchAsync from "../utils/catchAsync";
import jwt from "jsonwebtoken";
import { hash, check } from "../utils/crypt";

//Login
export const login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ username });
  if (!user) return res.json({
    success: false,
    message: "Incorrect Email"
  })

  if (!check(password, user.password))
    return res.json({
      success: false,
      message: "Incorrect Password"
    });

  const token = jwt.sign(
    { id: user._id, email: user.email, username: user.username, role: "USER" },
    process.env.JWT_SECRET,
    { expiresIn: "700h" }
  );

  return res.json({
    success: true,
    message: "User logged in successfully",
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
      name: `${user.firstName} ${user.lastName}`,
      token,
    },
  });
});

//Add
export const add = catchAsync(async (req, res, next) => {
  const isEmailUnique = await checkEmail(req.body.email);
  if (!isEmailUnique) return res.json({
    success: false,
    message: "Email already exists"
  })

  const user = await Users.create({ ...req.body });
  if (!user) {
    return res.json({
      success: false,
      message: "User could not be added"
    })
  }

  const token = jwt.sign(
    { id: user._id, email: user.email, username: user.username, role: "USER" },
    process.env.JWT_SECRET,
    { expiresIn: "700h" }
  );

  return res.json({
    success: true,
    message: "User signed up successfully",
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
      name: `${user.firstName} ${user.lastName}`,
      token,
    },
  });
});

const updateUser = async (id, user) => {
  let updatedUser = null;
  const result = await Users.findByIdAndUpdate(id, user, { new: true });
  if (result) updatedUser = await getUser({ _id: result._id });
  return updatedUser;
};

//Update
export const update = catchAsync(async (req, res, next) => {
  const existing = await Users.findOne({ _id: req.body.id });
  if (!existing) return res.json({
    success: false,
    message: "User not found"
  })

  const { id, email } = req.body;
  if (email) {
    if (email !== existing.email) {
      const isEmailUnique = await checkEmail(email);
      if (!isEmailUnique) return res.json({
        success: false,
        message: "Email already exists"
      })
    }
  }

  const data = JSON.parse(JSON.stringify(req.body));

  if (data.password) {
    delete data.password
  }

  const user = await updateUser(id, data);

  if (user) {
    return res.json({
      success: true,
      message: "User updated successfully",
      user,
    });
  }

  return res.json({
    success: false,
    message: "User could not be updated",
  });
});

//Get All
export const getAll = async (_, res) => {
  const users = await Users.find({ isBlocked: false });
  if (users.length > 0) {
    return res.json({
      success: true,
      message: "Users found",
      users,
    });
  }
  return res.json({
    success: false,
    message: "Users not found"
  })
};

//Get One
export const get = catchAsync(async (req, res, next) => {
  const user = await getUser({
    _id: mongoose.Types.ObjectId(req.params.id),
    isBlocked: false,
  });
  if (!user) return res.json({
    success: false,
    message: "Users not found"
  })

  return res.json({
    success: true,
    message: "User found",
    user,
  });
});

//Delete
export const del = catchAsync(async (req, res, next) => {
  const existing = await Users.findOne({ _id: req.body.id });
  if (!existing) {
    return res.json({
      success: false,
      message: "User not found"
    })
  }

  const deletedUser = await Users.findOneAndDelete({ _id: req.body.id });
  if (!deletedUser) return res.json({
    success: false,
    message: "User not found"
  })

  return res.json({
    success: true,
    message: "User deleted successfully",
    user: deletedUser,
  });
});

export const block = catchAsync(async (req, res, next) => {
  const existing = await Users.findOne({ _id: req.body.id });
  if (!existing) return res.json({
    success: false,
    message: "User not found"
  })
  if (existing.isBlocked) return res.json({
    success: false,
    message: "User already blocked"
  })

  const blockedUser = await updateUser(req.body.id, { isBlocked: true });
  if (!blockedUser) return res.json({
    success: false,
    message: "User could not be blocked"
  })

  res.json({
    success: true,
    message: "User blocked successfully",
    user: blockedUser,
  });
});

export const unblock = catchAsync(async (req, res, next) => {
  const existing = await Users.findOne({ _id: req.body.id });
  if (!existing) return res.json({
    success: false,
    message: "User not found"
  })
  if (!existing.isBlocked)
    return res.json({
      success: false,
      message: "User already unblocked"
    })

  const user = await updateUser(req.body.id, { isBlocked: false });
  if (!user) return res.json({
    success: false,
    message: "User could not be unblocked"
  })

  res.json({
    success: true,
    message: "User unblocked successfully",
    user,
  });
});

export const updatePassword = catchAsync(async (req, res, next) => {
  const existing = await Users.findOne({ _id: req.body.id });
  if (!existing) return res.json({
    success: false,
    message: "User not found"
  })

  const user = await updateUser(req.body.id, {
    password: hash(req.body.password),
  });

  if (!user) return res.json({
    success: false,
    message: "Password could not be updated"
  })

  res.json({
    success: true,
    message: "Password updated successfully",
    user,
  });
});

async function checkEmail(email) {
  let result = await Users.find({ email });
  return !result.length;
}

async function getUsers(query = null) {
  let users = [];
  if (query) {
    users = await Users.aggregate(
      [
        {
          $match: { ...query },
        },
      ]
    )
  } else users = await Users.find()

  return users;
}

async function getUser(query) {
  const users = await getUsers(query);
  return users[0];
}
