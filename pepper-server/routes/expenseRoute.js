import express from "express";
import { addTransaction } from "../services/firebaseService.js";

const expenseRoute = express.Router();

expenseRoute.post("/add-expense", async (req, res) => {
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
        res.status(200).json({ message: "Expenses added successfully!" });
    } catch (error) {
        console.error("Error adding expense:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default expenseRoute;
