import express from "express";
import { addTransaction } from "../services/firebaseService.js";

const incomeRoute = express.Router();

incomeRoute.post("/add-income", async (req, res) => {
    try {
        const { type, title, description, amount, dateOfTransaction, category, token } = req.body;
        await addTransaction("transactions", {
            type,
            title,
            description,
            amount,
            dateOfTransaction,
            category,
            userId: token,
        });
        res.status(200).json({ message: "Income added successfully!" });
    } catch (error) {
        console.error("Error adding income:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default incomeRoute;
