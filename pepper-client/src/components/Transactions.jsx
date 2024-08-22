import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { userTransactions } from '../provider/RecoilStore'
import { categoryImages } from '../assets/data/CategoryImages'
import RemoveIcon from '../assets/images/icons/action-icon/remove.png'
import axios from 'axios'

const Transactions = () => {
     const userTransactionData = useRecoilState(userTransactions)
     const [showOnly, setShowOnly] = useState("")
     const [showDeletePrompt, setShowDeletePrompt] = useState(false)
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
                                                  <div key={key} className="transaction-entry padding">
                                                       <img className="transaction-icon" src={imgSrc} alt={val.category} />
                                                       <div className="trans-content">
                                                            <h1 className="trans-head">{val.title}</h1>
                                                            <p className="trans-desc">{val.description || val.category}</p>
                                                       </div>
                                                       <div className='transaction-action'>
                                                            <h1 className={`trans-amt ${val.type == 'income' ? 'income' : 'expense'}`}>{val.amount}</h1>
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
                              <button className='cancel' onClick={() => setShowDeletePrompt(false)}>Close</button>
                              <button className='delete' onClick={() => handleDelete()}>Delete</button>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default Transactions
