import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoute from "./routes/authRoute.js";
import incomeRoute from "./routes/incomeRoute.js";
import expenseRoute from "./routes/ExpenseRoute.js";
import getTransaction from "./routes/getTransaction.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/auth", authRoute);
app.use("/transactions", incomeRoute);
app.use("/transactions", expenseRoute);

app.use("/transactions", getTransaction);

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
