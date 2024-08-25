import { useRecoilValue } from "recoil";
import { userTransactions } from "../../provider/RecoilStore";
import { categoryImages } from "../../assets/data/categoryImages.js";

const PreviousEntries = () => {
    const transactions = useRecoilValue(userTransactions)

    return (
        <div className="transactions">

            {
                transactions.length === 0 ? <p className="no-transaction-found">No transactions found!</p> :
                    transactions.slice(0, 10).map((val, key) => {
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
                    })
            }
        </div>
    );
};

export default PreviousEntries;
