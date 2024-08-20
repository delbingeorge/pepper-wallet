import React, { useEffect, useState } from "react";
import giftIcon from '../../assets/images/icons/expense-icon/gifts-icon.png'
import salaryIcon from '../../assets/images/icons/expense-icon/salary.png'
import { useRecoilValue } from "recoil";
import { userInfo } from "../../provider/RecoilStore";
import axios from "axios";

const PreviousEntries = () => {

    const userValue = useRecoilValue(userInfo);
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        fetchAllTransactions();
    }, [userValue]);

    const fetchAllTransactions = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/transactions/user/${userValue.uid}`)
            if (res.status === 200) {
                setTransactions(res.data);
                console.log(res.data)
            } else {
                console.log("Failed to fetch transactions");
            }
        } catch (error) {

        }
    }

    const entries = [{
        title: 'Debit account closed',
        description: 'Paid the left over debt to raksha',
        date: '21/07/24',
        icon: giftIcon,
        amount: '1534',
        type: 'expense',
        category: 'Debt'
    }, {
        title: 'Salary credited',
        description: 'Rupees 60,000 credit for the month of March',
        date: '21/07/24',
        icon: salaryIcon,
        amount: '60000',
        type: 'income',
        category: 'Salary'
    }]
    return (
        <div className="transactions">
            {entries.map((val, key) => {
                return (
                    <div key={key} className="transaction-entry">
                        <img className="transaction-icon" src={val.icon} alt={val.category} />
                        <div className="trans-content">
                            <h1 className="trans-head">{val.title.substring(0, 15) + '...'}</h1>
                            <p className="trans-desc">{val.description.substring(0, 13) + '...'}</p>
                        </div>
                        <h1 className="trans-amt">{val.amount}</h1>
                    </div>
                )
            })}
        </div>
    );
};

export default PreviousEntries;
