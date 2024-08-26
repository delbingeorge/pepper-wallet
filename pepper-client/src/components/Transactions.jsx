import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userInfo, userTransactions } from '../provider/RecoilStore'

import RemoveIcon from '../assets/images/icons/action-icon/remove.png'
import EditIcon from '../assets/images/icons/action-icon/edit.png'
import CloseIcon from '../assets/images/icons/action-icon/close.png'
import GiftsIcon from '../assets/images/icons/income-icon/gifts-icon.png'
import SalaryIcon from '../assets/images/icons/income-icon/salary.png';
import SavingsIcon from '../assets/images/icons/income-icon/savings.png'
import OtherIcon from '../assets/images/icons/income-icon/other.png'
import FoodIcon from "../assets/images/icons/expense-icon/food.png"
import GroceryIcon from "../assets/images/icons/expense-icon/grocery.png"
import FuelIcon from "../assets/images/icons/expense-icon/fuel.png"
import HealthIcon from "../assets/images/icons/expense-icon/health.png"
import ShoppingIcon from "../assets/images/icons/expense-icon/shopping.png"
import DebtPaidIcon from "../assets/images/icons/expense-icon/debt-pay.png"
import EduIcon from "../assets/images/icons/expense-icon/education.png"
import EnterIcon from "../assets/images/icons/expense-icon/entertainment.png"
import RentIcon from "../assets/images/icons/expense-icon/rent.png"
import TransIcon from "../assets/images/icons/expense-icon/transport.png"

const Transactions = () => {
     const [userTransactionData, setUserTransactionData] = useState([]);
     const [transactions, setTransactions] = useRecoilState(userTransactions)
     const [showOnly, setShowOnly] = useState("");
     const [showDeletePrompt, setShowDeletePrompt] = useState(false);
     const [showEditPrompt, setShowEditPrompt] = useState(false);
     const [modalDetails, setModalDetails] = useState({});
     const [deleteItemId, setDeleteItemId] = useState(null);
     const userValue = useRecoilValue(userInfo)
     const [formData, setFormData] = useState({
          type: 'income',
          title: '',
          description: '',
          amount: '',
          dateOfTransaction: '',
          category: '',
     });

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

     useEffect(() => {
          fetchAllTransactions();
     }, [userInfo, formData, transactions])

     const fetchAllTransactions = async () => {
          try {
               const res = await axios.get(`${import.meta.env.VITE_API_URL}/transactions/user/${userValue.uid}`)
               if (res.status === 200) {
                    setUserTransactionData(res.data);
                    setTransactions(res.data)
               } else {
                    console.log("Failed to fetch transactions");
               }
          } catch (error) {
               console.log(error)
          }
     }

     const filterResult = userTransactionData?.filter(val => {
          if (showOnly === 'expense') return val.type === 'expense';
          if (showOnly === 'income') return val.type === 'income';
          return true;
     });

     const handleInputChange = (e) => {
          const { name, value } = e.target;
          setFormData((prevData) => ({
               ...prevData,
               [name]: value,
          }));
     };

     const handleUpdate = async (e) => {
          e.preventDefault();
          if (!formData.category) {
               alert("Category is required.");
               return;
          }

          try {
               const res = await axios.put(`${import.meta.env.VITE_API_URL}/transactions/update-info`, {
                    ...formData,
                    tId: modalDetails.id
               });
               if (res.status === 200) {
                    setShowEditPrompt(false);
                    setFormData({
                         type: modalDetails.type,
                         title: '',
                         description: '',
                         amount: '',
                         dateOfTransaction: '',
                         category: '',
                    });
               } else {
                    console.log("Something went wrong!");
               }
          } catch (error) {
               console.error("Error updating transaction:", error);
          }
     };

     const handleDelete = async () => {
          try {
               const res = await axios.delete(`${import.meta.env.VITE_API_URL}/transactions/delete/${deleteItemId}`);
               if (res.status === 200) {
                    setShowDeletePrompt(false);
               } else {
                    console.log("Failed to delete transaction.");
               }
          } catch (error) {
               console.error("Error deleting transaction:", error);
          }
     };

     return (
          <div className='content-container'>
               <div className='content-head'>
                    <h1>Transactions</h1>
                    <h2></h2>
               </div>

               {userTransactionData?.length > 0 && (
                    <>
                         <div className='content-filter'>
                              <div className='filter-options'>
                                   <button className={`filter-btn ${showOnly === 'expense' && 'active'}`} onClick={() => setShowOnly('expense')}>Expenses</button>
                                   <button className={`filter-btn ${showOnly === 'income' && 'active'}`} onClick={() => setShowOnly('income')}>Income</button>
                                   {showOnly && <button className='filter-btn' onClick={() => setShowOnly('')}>Clear</button>}
                              </div>
                              <div className='result-content'>
                                   <h4>{filterResult?.length} transactions</h4>
                              </div>
                         </div>

                         <div className="transactions">
                              {filterResult?.map((val, key) => {
                                   const imgSrc = categoryImages[val.category];
                                   return (
                                        <div key={key} className="transaction-content">
                                             <div className='transaction-left'>
                                                  <img className="transaction-icon" src={imgSrc} alt={val.category} />
                                                  <div className='transaction-text'>
                                                       <h1>{val.title}</h1>
                                                       <p>{val.description || val.category}</p>
                                                  </div>
                                             </div>
                                             <div className='transaction-right'>
                                                  <h1 className={`trans-amt ${val.type === 'income' ? 'income' : 'expense'}`}>{val.amount}</h1>
                                                  <img
                                                       onClick={() => {
                                                            setShowEditPrompt(true);
                                                            setModalDetails(val);
                                                            setFormData(val);
                                                       }}
                                                       className='transaction-action-icon'
                                                       src={EditIcon}
                                                       alt="Edit"
                                                  />
                                                  <img
                                                       onClick={() => {
                                                            setShowDeletePrompt(true);
                                                            setDeleteItemId(val.id);
                                                       }}
                                                       className='transaction-action-icon'
                                                       src={RemoveIcon}
                                                       alt="Remove"
                                                  />
                                             </div>
                                        </div>
                                   )
                              })}
                         </div>
                    </>
               )}

               <div className={`slide-in-sheet ${showDeletePrompt ? 'open' : 'close'}`}>
                    <div className='delete-prompt'>
                         <div className='delete-prompt-head'>
                              <h1>Are you sure you want to delete?</h1>
                              <p>This action is irreversible.</p>
                         </div>
                         <div className='delete-prompt-action'>
                              <button className='cancel' onClick={() => setShowDeletePrompt(false)}>Close</button>
                              <button className='delete' onClick={handleDelete}>Delete</button>
                         </div>
                    </div>
               </div>

               <div className={`slide-in-sheet ${showEditPrompt ? 'open' : 'close'}`}>
                    <div className='sheet-content'>
                         <div className='sheet-head'>
                              <div>
                                   <h1>Edit Details</h1>
                              </div>
                              <img
                                   className='head-action-close'
                                   src={CloseIcon}
                                   alt="Close"
                                   onClick={() => setShowEditPrompt(false)}
                              />
                         </div>
                         <form className='add-income-form' onSubmit={handleUpdate}>
                              <div className='input-field'>
                                   <label className='input-label' htmlFor="income-title">Title</label>
                                   <input
                                        required
                                        type="text"
                                        id='income-title'
                                        name="title"
                                        value={formData.title}
                                        placeholder="Enter Title"
                                        onChange={handleInputChange}
                                   />
                              </div>
                              <div className='input-field'>
                                   <label className='input-label' htmlFor="income-description">Description {"(optional)"}</label>
                                   <textarea
                                        name="description"
                                        id="income-description"
                                        value={formData.description}
                                        placeholder="Enter Description"
                                        onChange={handleInputChange}
                                   ></textarea>
                              </div>
                              <div className='input-field'>
                                   <label className='input-label' htmlFor="income-amount">Amount</label>
                                   <input
                                        required
                                        type="number"
                                        id='income-amount'
                                        name="amount"
                                        value={formData.amount}
                                        placeholder="Enter Amount"
                                        onChange={handleInputChange}
                                   />
                              </div>
                              <div className='input-field'>
                                   <label className='input-label' htmlFor="income-date">Date of transaction</label>
                                   <input
                                        required
                                        type="date"
                                        id='income-date'
                                        name="dateOfTransaction"
                                        value={formData.dateOfTransaction}
                                        placeholder="Enter Date"
                                        onChange={handleInputChange}
                                   />
                              </div>
                              <div className="input-field">
                                   <label className='input-label' htmlFor="income-category">Select category</label>
                                   <div className='input-chip-group' id='transaction-type'>
                                        {["Gifts", "Salary", "Savings", "Food", "Grocery", "Fuel", "Health", "Shopping", "Debt paid", "Education", "Entertainment", 'Rent', "Transport", "Others"].map((category, index) => (
                                             <span
                                                  key={`${category}-${index}`}
                                                  className={`chip ${formData.category === category ? 'active' : ''}`}
                                                  data-value={category}
                                                  onClick={() => setFormData({ ...formData, category })}
                                             >
                                                  {category}
                                             </span>
                                        ))}
                                   </div>
                              </div>
                              <div className='form-submit-container'>
                                   <input className='form-submit' type="submit" value="Update" />
                              </div>
                         </form >
                    </div>
               </div>
          </div>
     )
}

export default Transactions
