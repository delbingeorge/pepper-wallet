import axios from 'axios'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { userTransactions } from '../provider/RecoilStore'
import { categoryImages } from '../assets/data/CategoryImages'
import RemoveIcon from '../assets/images/icons/action-icon/remove.png'
import EditIcon from '../assets/images/icons/action-icon/edit.png'
import CloseIcon from '../assets/images/icons/action-icon/close.png'

const Transactions = () => {
     const userTransactionData = useRecoilState(userTransactions)
     const [showOnly, setShowOnly] = useState("")
     const [showDeletePrompt, setShowDeletePrompt] = useState(false)
     const [showEditPrompt, setShowEditPrompt] = useState([false, null])
     const [modalDetails, setModalDetails] = useState({})
     const [deleteItemId, setDeleteItemId] = useState(null)

     const filterResult = userTransactionData[0]?.filter(val => {
          if (showOnly === 'expense') return val.type === 'expense'
          if (showOnly === 'income') return val.type === 'income'
          return true;
     })

     const handleDelete = async () => {
          try {
               const res = await axios.delete(`http://localhost:3000/transactions/delete/${deleteItemId}`);
               if (res.status === 200) {
                    setShowDeletePrompt(false)
               }
               else {
                    console.log("undone")
               }
          } catch (error) {
               console.log("Something went wrong!")
          }
     }

     return (
          <div className='content-container'>
               <div className='content-head'>
                    <h1>Transactions</h1>
                    <h2></h2>
               </div>

               {
                    userTransactionData[0]?.length > 0 ?
                         <>
                              <div className='content-filter'>
                                   <div className='filter-options'>
                                        <button className={`filter-btn ${showOnly === 'expense' && 'active'}`} onClick={() => { setShowOnly('expense') }}>Expenses</button>
                                        <button className={`filter-btn ${showOnly === 'income' && 'active'}`} onClick={() => { setShowOnly('income') }}>Income</button>
                                        {
                                             showOnly &&
                                             <button className={`filter-btn`} onClick={() => { setShowOnly('') }}>clear</button>
                                        }
                                   </div>
                                   <div className='result-content'>
                                        <h4>{filterResult?.length} transactions</h4>
                                   </div>
                              </div>

                              <div className="transactions">
                                   {
                                        filterResult?.map((val, key) => {
                                             const imgSrc = categoryImages[val.category]
                                             return (
                                                  <div key={key} className="transaction-content">
                                                       <div className='transaction-left'>
                                                            <img className="transaction-icon" src={imgSrc} alt={val.category} />
                                                            <div className='transaction-text'>
                                                                 <h1 className="">{val.title}</h1>
                                                                 <p className="">{val.description || val.category}</p>
                                                            </div>
                                                       </div>
                                                       <div className='transaction-right'>
                                                            <h1 className={`trans-amt ${val.type == 'income' ? 'income' : 'expense'}`}>{val.amount}</h1>
                                                            <img onClick={() => { setShowEditPrompt(true); setModalDetails(val) }} className='transaction-action-icon' src={EditIcon} alt="" />
                                                            <img onClick={() => { setShowDeletePrompt(true); setDeleteItemId(val.id) }} className='transaction-action-icon' src={RemoveIcon} alt="" />
                                                       </div>
                                                  </div>
                                             )
                                        })
                                   }

                              </div>
                         </>
                         : null}

               <div className={`slide-in-sheet ${showDeletePrompt ? 'open' : 'close'}`}>
                    <div className='delete-prompt '>
                         <div className='delete-prompt-head'>
                              <h1>Are you sure you want to delete?</h1>
                              <p>This action is irreversible.</p>
                         </div>
                         <div className='delete-prompt-action'>
                              <button className='cancel' onClick={() => setShowDeletePrompt(false, null)}>Close</button>
                              <button className='delete' onClick={() => handleDelete()}>Delete</button>
                         </div>
                    </div>
               </div>

               <div className={`slide-in-sheet ${showEditPrompt === true ? 'open' : 'close'}`}>
                    <div className='sheet-content'>
                         <div className='sheet-head'>
                              <div>
                                   <h1>Edit Details</h1>
                              </div>
                              <img className='head-action-close' src={CloseIcon} alt="" onClick={() => { setShowEditPrompt(false) }} />
                         </div>
                         <form className='add-income-form'>
                              <div className='input-field'>
                                   <label className='input-label' htmlFor="income-title">Title</label>
                                   <input
                                        required
                                        type="text"
                                        id='income-title'
                                        name="title"
                                        value={modalDetails.title}

                                   />
                              </div>
                              <div className='input-field'>
                                   <label className='input-label' htmlFor="income-description">Description {"(optional)"}</label>
                                   <textarea
                                        name="description"
                                        id="income-description"
                                        value={modalDetails.description}

                                   ></textarea>
                              </div>
                              <div className='input-field'>
                                   <label className='input-label' htmlFor="income-amount">Amount</label>
                                   <input
                                        required
                                        type="number"
                                        id='income-amount'
                                        name="amount"
                                        value={modalDetails.amount}

                                   />
                              </div>
                              <div className='input-field'>
                                   <label className='input-label' htmlFor="income-date">Date of transaction</label>
                                   <input
                                        required
                                        type="date"
                                        id='income-date'
                                        name="dateOfTransaction"
                                        value={modalDetails.dateOfTransaction}
                                   />
                              </div>
                              <div className='form-submit-container'>
                                   {/* {required && <label className='input-label' htmlFor="income-category">Category not selected!</label>} */}
                                   <input className='form-submit' type="submit" value="Update" />
                              </div>
                         </form >
                    </div>
               </div>
          </div>
     )
}

export default Transactions
