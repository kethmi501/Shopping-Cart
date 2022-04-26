import express from "express";

const router = express.Router();


// controllers
import {
    register,
    login
} from "../controllers/user";

router.post("/register", register);
router.post("/login", login);


module.exports = router;
