import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import asdf from '../../assets/images/icons/income-icon/gifts-icon.png'
import { userInfo } from "../../provider/RecoilStore";
import axios from "axios";

const PreviousEntries = () => {

    const userValue = useRecoilValue(userInfo);
    const [transactions, setTransactions] = useState([])

    const categoryImages = {
        "gifts": "src/assets/images/icons/income-icon/gifts-icon.png",
        "salary": "src/assets/images/icons/income-icon/salary.png",
        "savings": "src/assets/images/icons/income-icon/savings.png",
        "others": "src/assets/images/icons/income-icon/other.png",

        "food": "src/assets/images/icons/expense-icon/food.png",
        "grocery": "src/assets/images/icons/expense-icon/grocery.png",
        "fuel": "src/assets/images/icons/expense-icon/fuel.png",
        "health": "src/assets/images/icons/expense-icon/health.png",
        "shopping": "src/assets/images/icons/expense-icon/shopping.png",
        "debt paid": "src/assets/images/icons/expense-icon/debt-pay.png",
        "education": "src/assets/images/icons/expense-icon/education.png",
        "entertainment": "src/assets/images/icons/expense-icon/entertainment.png",
        "rent": "src/assets/images/icons/expense-icon/rent.png",
        "transport": "src/assets/images/icons/expense-icon/transport.png",
    };

    useEffect(() => {
        fetchAllTransactions();
    }, [userValue]);

    const fetchAllTransactions = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/transactions/user/${userValue.uid}`)
            if (res.status === 200) {
                setTransactions(res.data);
            } else {
                console.log("Failed to fetch transactions");
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="transactions">
            {transactions.map((val, key) => {
                const imgSrc = categoryImages[val.category]
                return (
                    <div key={key} className="transaction-entry">
                        <img className="transaction-icon" src={imgSrc} alt={val.category} />
                        <div className="trans-content">
                            <h1 className="trans-head">{val.title.substring(0, 15) + '...'}</h1>
                            <p className="trans-desc">{val.description.substring(0, 13) + '...'}</p>
                        </div>
                        <h1 className={`trans-amt ${val.type == 'income' ? 'income' : 'expense'}`}>{val.amount}</h1>
                    </div>
                )
            })}
        </div>
    );
};

export default PreviousEntries;
