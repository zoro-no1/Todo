import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import PasswordCheck from "../utils/PasswordCheck.js";
import { z } from "zod";

// Defining a schema for user validation using Zod
const userSchema = z.object({
    username: z.string().min(4, { message: "Must be 4 or more characters long" }).max(50, { message: "Must be 50 or less characters long" }),
    email: z.string().email().min(6).max(60),
    password: z.string().min(6).max(100)
});

// Controller for user signup
export const signin = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Validate request body against the schema
        const result = userSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(404).json({
                message: "All details Needed"
            });
        }

        // Check if the user already exists
        const ExistingUser = await User.findOne({ email });
        if (ExistingUser) {
            return res.status(404).json({
                message: "User Exist"
            });
        }

        // Create a new user
        const user = await User.create({
            username, email, password
        });
        if (!user) {
            res.status(500).json({
                message: "Something went Wrong While Creating A User"
            });
        }

        // Generate a token and send it as a cookie
        const token = generateToken(user._id);
        res.status(201).cookie("token", token).json({
            message: "User Created"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Backend Error"
        });
    }
};

// Controller for user login
export const login = async (req, res) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(404).json({
            message: "All details Needed"
        });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({
                message: "User Not Exist"
            });
        }

        // Verify the password
        const checkPassword = await PasswordCheck(password, user.password);
        if (!checkPassword) {
            res.status(404).json({
                message: "Incorrect Password"
            });
        }

        // Generate a token and send it as a cookie
        const token = await generateToken(user._id);
        res.status(201).cookie("token", token).json({
            message: "login"
        });
    } catch (error) {
        console.log("login problem");
        res.status(500).json({
            message: "Backend Error"
        });
    }
};

// Controller for user logout
export const logout = async (req, res) => {
    try {
        // Clear the token cookie and send a response
        res.status(200)
            .clearCookie("token")
            .json({
                message: "logout"
            });
    } catch (error) {
        res.status(500)
            .clearCookie("token")
            .json({
                message: "server error"
            });
    }
};

// Controller to check user authentication status
export const check = async (req, res) => {
    try {
        // Respond with the authenticated user's details
        res.status(200).json({
            user: req.user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "server error"
        });
    }
};