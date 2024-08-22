import express from "express";
import { removeTransaction } from "../services/firebaseService.js";

const deleteTransaction = express.Router();

deleteTransaction.delete("/delete/:id", async (req, res) => {
    try {
        const transactionId = req.params;
        await removeTransaction(transactionId);
        res.status(200).json({ message: "delete successfully!" });
    } catch (error) {
        console.error("Error adding income:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default deleteTransaction;
