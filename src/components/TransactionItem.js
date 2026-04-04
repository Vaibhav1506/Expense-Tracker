import React from 'react';

function TransactionItem({ transaction, deleteTransaction }) {
  const isIncome = transaction.amount > 0;

  return (
    <div className={`transaction-item ${isIncome ? 'income' : 'expense'}`}>
      
      <div className="left">
        <span className="text">Description: {transaction.text}</span>
        <span className="info">
          Date: {transaction.date} <br/> 
          Time : {transaction.time} <br/> 
          ID : {transaction.id}
        </span>
      </div>

      <div className="right">
        <span className="amount">
          ₹ {transaction.amount}
        </span>

        <button onClick={() => deleteTransaction(transaction.id)}>
          ❌
        </button>
      </div>

    </div>
  );
}

export default TransactionItem;