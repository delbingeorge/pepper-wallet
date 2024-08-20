import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoute from "./routes/authRoute.js";
import incomeRoute from "./routes/incomeRoute.js";
import expenseRoute from "./routes/ExpenseRoute.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/auth", authRoute);
app.use("/transactions", incomeRoute);
app.use("/transactions", expenseRoute);

const port = 3000;

app.get("/transaction/user/:uid", async (req, res) => {
    const { uid } = req.params;
    try {
        res.status(200).json({ message: "API Working correctly!" });
    } catch (error) {
        console.log("Something went wrong!");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
