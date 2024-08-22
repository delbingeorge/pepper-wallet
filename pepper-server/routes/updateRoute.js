import express from "express";
import { updateTransaction } from "../services/firebaseService.js";

const updateRoute = express.Router();

updateRoute.put("/update-info", async (req, res) => {
    try {
        const { type, title, description, amount, dateOfTransaction, category, tId } = req.body;
        const categoryCase = category.toLowerCase();
        await updateTransaction(
            {
                type,
                title,
                description,
                amount,
                dateOfTransaction,
                category: categoryCase,
            },
            tId
        );
        res.status(200).json({ message: "Update successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default updateRoute;
