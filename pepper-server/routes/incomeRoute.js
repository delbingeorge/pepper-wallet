import express from "express";
import { addTransaction } from "../services/firebaseService.js";

const incomeRoute = express.Router();

incomeRoute.post("/add-income", async (req, res) => {
    try {
        const { type, title, description, amount, dateOfTransaction, category, token } = req.body;
        const categoryCase = category.toLowerCase();
        await addTransaction("transactions", {
            type,
            title,
            description,
            amount,
            dateOfTransaction,
            category: categoryCase,
            userId: token,
        });
        res.status(200).json({ message: "Income added successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default incomeRoute;
