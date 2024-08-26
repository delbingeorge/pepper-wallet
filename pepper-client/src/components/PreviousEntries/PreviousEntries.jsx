import { useRecoilValue } from "recoil";
import { userTransactions } from "../../provider/RecoilStore";

import GiftsIcon from '../../assets/images/icons/income-icon/gifts-icon.png'
import SalaryIcon from '../../assets/images/icons/income-icon/salary.png';
import SavingsIcon from '../../assets/images/icons/income-icon/savings.png'
import OtherIcon from '../../assets/images/icons/income-icon/other.png'
import FoodIcon from "../../assets/images/icons/expense-icon/food.png"
import GroceryIcon from "../../assets/images/icons/expense-icon/grocery.png"
import FuelIcon from "../../assets/images/icons/expense-icon/fuel.png"
import HealthIcon from "../../assets/images/icons/expense-icon/health.png"
import ShoppingIcon from "../../assets/images/icons/expense-icon/shopping.png"
import DebtPaidIcon from "../../assets/images/icons/expense-icon/debt-pay.png"
import EduIcon from "../../assets/images/icons/expense-icon/education.png"
import EnterIcon from "../../assets/images/icons/expense-icon/entertainment.png"
import RentIcon from "../../assets/images/icons/expense-icon/rent.png"
import TransIcon from "../../assets/images/icons/expense-icon/transport.png"

const PreviousEntries = () => {
    const transactions = useRecoilValue(userTransactions)


    const categoryImages = {
        gifts: GiftsIcon,
        salary: SalaryIcon,
        savings: SavingsIcon,
        others: OtherIcon,
        food: FoodIcon,
        grocery: GroceryIcon,
        fuel: FuelIcon,
        health: HealthIcon,
        shopping: ShoppingIcon,
        "debt paid": DebtPaidIcon,
        education: EduIcon,
        entertainment: EnterIcon,
        rent: RentIcon,
        transport: TransIcon,
    };

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
