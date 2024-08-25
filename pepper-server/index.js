import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoute from "./routes/authRoute.js";
import incomeRoute from "./routes/incomeRoute.js";
import getTransaction from "./routes/getTransaction.js";
import deleteTransaction from "./routes/deleteTransaction.js";
import updateRoute from "./routes/updateRoute.js";
import expenseRoute from "./routes/expenseRoute.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// routing call for authentication
app.use("/auth", authRoute);

// routing call for add transactions
app.use("/transactions", incomeRoute);
app.use("/transactions", expenseRoute);

// get all transaction
app.use("/transactions", getTransaction);

// delete transaction
app.use("/transactions", deleteTransaction);

// update transaction info
app.use("/transactions", updateRoute);

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
