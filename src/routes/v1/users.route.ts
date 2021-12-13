import express, { Router } from "express";
import { createUser, deleteAllUsers, getUser, getUsers, loginUser } from "../../services/user.service";
import { UserSignupInput, UserObject, UserLoginInput } from "../../types/user";

export const users: Router = express.Router();

users.get<{}, UserObject[]>("/@all", async (req, res) => getUsers().then((users) => res.json(users)));

users.delete<{}, { message: string }>("/@all", async (req, res) =>
  deleteAllUsers().then(() => res.json({ message: "success" }))
);

users.post<{}, { user: UserObject; token: string } | { message: string }, UserSignupInput>("/@signup", async (req, res) =>
  createUser(req.body).then(
    (data) => res.status(201).json(data),
    (reason) => res.status(400).json({ message: reason })
  )
);

users.post<{}, { user: UserObject; token: string } | { message: string }, UserLoginInput>("/@login", async (req, res) =>
  loginUser(req.body).then(
    (data) => res.status(200).json(data),
    (reason) => res.status(400).json({ message: reason })
  )
);

users.get("/@search/:by/:query", async (req, res) =>
  getUser({ [req.params.by]: req.params.query }).then((user) =>
    user !== null ? res.json(user) : res.status(404).json({ message: "user not found" })
  )
);