import User from "../models/user";
import jwt from "jsonwebtoken";

require("dotenv").config();

export const register = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if (user) {
            return res.status(400).json({msg: "User already exists"});
        }

        const newUser = new User({name, email, password});

        await User.create(newUser);

        res.status(201).json({msg: "User created", success: true});
    } catch (error) {
        res.status(500).json({msg: "Server error", success: false});
    }
};

export const login = (req, res) => {
    const {email, password} = req.body;

    try {
        User.findOne({
            email: email
        }, (err, user) => {
            if (!user) {
                return res.status(400).json({error: "User not found"});
            }

            if (user.password !== password) {
                return res.status(400).json({error: "Invalid credentials"});
            }

            const {_id, name, email} = user;
            const token = jwt.sign(
                {_id: user._id},
                process.env.JWT_SECRET, {
                    expiresIn: "7d",
                });

            res.status(200).json({
                success: true,
                token,
                user: {_id, name, email}
            });

        });
    } catch (error) {
        res.status(500).json({msg: "Server error", success: false});
    }


}

