import React, { useState } from 'react'
import CloseIcon from '../../assets/images/icons/action-icon/close.png'
import IncomeLogo from '../../assets/images/icons/casual-icon/zipper-mouth-face.gif'
import { useRecoilState, useRecoilValue } from 'recoil'
import { showModalForExpense, userInfo } from '../../provider/RecoilStore'
import axios from 'axios'

const AddExpense = () => {
     const [addExpense, setAddExpense] = useRecoilState(showModalForExpense);
     const [required, setRequired] = useState(false)
     const userValue = useRecoilValue(userInfo)
     const [formData, setFormData] = useState({
          type: 'expense',
          title: '',
          description: '',
          amount: '',
          dateOfTransaction: '',
          category: '',
     })

     const handleInputChange = (e) => {
          const { name, value } = e.target;
          setFormData((prevData) => ({
               ...prevData,
               [name]: value,
          }));
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          if (!formData.category) {
               setRequired(true)
               return;
          }
          try {
               const res = await axios.post('http://localhost:3000/transactions/add-expense', { ...formData, token: userValue.uid })
               if (res.status === 200) {
                    setAddExpense(false)
                    setFormData({
                         type: 'expense',
                         title: '',
                         description: '',
                         amount: '',
                         dateOfTransaction: '',
                         category: '',
                    });
               } else {
                    console.log("something went wrong!")
               }
          } catch (error) {
               console.log(error)
          }
     }

     return (
          <>
               <div className='sheet-content'>
                    <div className='sheet-head'>
                         <div>
                              <img className='sheet-head-icon' src={IncomeLogo} alt="" onClick={() => { setAddExpense(false) }} />
                              <h1>Add Expense</h1>
                         </div>
                         <img className='head-action-close' src={CloseIcon} alt="" onClick={() => { setAddExpense(false) }} />
                    </div>
                    <form className='add-income-form' onSubmit={handleSubmit}>
                         <div className='input-field'>
                              <label className='input-label' htmlFor="income-title">Title</label>
                              <input
                                   required
                                   type="text"
                                   id='income-title'
                                   name="title"
                                   value={formData.title}
                                   onChange={handleInputChange}
                              />
                         </div>
                         <div className='input-field'>
                              <label className='input-label' htmlFor="income-description">Description {"(optional)"}</label>
                              <textarea
                                   name="description"
                                   id="income-description"
                                   value={formData.description}
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
                                   onChange={handleInputChange}
                              />
                         </div>
                         <div className="input-field">
                              <label className='input-label' htmlFor="income-category">Select category</label>
                              <div className='input-chip-group' id='transaction-type'>
                                   {["Food", "Grocery", "Fuel", "Health", "Shopping", "Debt paid", "Education", "Entertainment", 'Rent', "Transport", "Others"].map((category) => (
                                        <span
                                             key={category}
                                             className={`chip ${formData.category === category ? 'active' : 'inactive'}`}
                                             data-value={category}
                                             onClick={() => {
                                                  setFormData({ ...formData, category })
                                             }}
                                        >
                                             {category}
                                        </span>
                                   ))}
                              </div>
                         </div>
                         <div className='form-submit-container'>
                              {required && <label className='input-label' htmlFor="income-category">Category not selected!</label>}
                              <input className='form-submit' type="submit" value="Add Expense" />
                         </div>
                    </form >
               </div >
          </>
     )
}

export default AddExpense
