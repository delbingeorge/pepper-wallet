import express from "express";
import { getAllTransactions } from "../services/firebaseService.js";

const getTransaction = express.Router();

getTransaction.get("/user/:uid", async (req, res) => {
    const { uid } = req.params;
    try {
        const transactions = await getAllTransactions(uid);
        res.status(200).json(transactions);
    } catch (error) {
        console.log("Something went wrong!", error);
        res.status(500).json({ error: "Something went wrong while fetching transactions." });
    }
});

export default getTransaction;
