import React from 'react';
import TransactionItem from './TransactionItem';
import '../styles/dashboard.css';

function TransactionList({transactions, deleteTransaction}) {
  return (
    <div>
      <h2>Transactions</h2>

      {transactions.length === 0 ? (
        <span className="empty-message">
          No transactions recorded
        </span>
      ) : (
        transactions.map((t) => (
          <TransactionItem
            key={t.id}
            transaction={t}
            deleteTransaction={deleteTransaction}
          />
        ))
      )}
    </div>
  );
}

export default TransactionList;