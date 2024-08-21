import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userInfo, userTransactions } from "../../provider/RecoilStore";
import axios from "axios";
import { categoryImages } from "../../assets/data/CategoryImages";

const PreviousEntries = () => {

    const userValue = useRecoilValue(userInfo);
    const [transactions, setTransactions] = useState([])
    const [allTransactions, getAllTransactions] = useRecoilState(userTransactions)

    useEffect(() => {
        fetchAllTransactions();
    }, [userValue]);

    const fetchAllTransactions = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/transactions/user/${userValue.uid}`)
            if (res.status === 200) {
                setTransactions(res.data);
                getAllTransactions(res.data)
            } else {
                console.log("Failed to fetch transactions");
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="transactions">
            {transactions.slice(0, 10).map((val, key) => {
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
