import React, { useState } from 'react';
import TransactionList from '../components/TransactionList';
import AddTransaction from '../components/AddTransaction';
import Balance from '../components/Balance';
import '../styles/dashboard.css';

function Dashboard({transactions, setTransactions}) {
  const [filter, setFilter] = useState("all");
  const [sortType, setSortType] = useState("newest");
  const [search, setSearch] = useState("");

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const processedTransactions = transactions
  .filter((t) => {
      return t.text.toLowerCase().includes(search.toLowerCase());
  }).filter((t) => {
      if (filter === "income") return t.amount > 0;
      if (filter === "expense") return t.amount < 0;
      return true;
  }).sort((a, b) => {
      if (sortType === "newest") return (b.timestamp || 0) - (a.timestamp || 0);
      if (sortType === "oldest") return (a.timestamp || 0) - (b.timestamp || 0);
      if (sortType === "high") return b.amount - a.amount;
      if (sortType === "low") return a.amount - b.amount;
      return 0;
  });

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <div className="top-section">
        <div className="dashboard">
          <div className="addtransaction">
            <AddTransaction setTransactions={setTransactions}
            transactions = {transactions}/>
          </div>
        </div>

        <div className="balance">
          <Balance transactions={transactions}/>
        </div>
      </div>
      
    <div className="controls">
      <input
        type="text"
        placeholder="Search transactions by description ... or sort by ..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />
      
      <select value = {filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
    
      <select value = {sortType} onChange={(e) => setSortType(e.target.value)}>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="high">Highest Amount</option>
        <option value="low">Lowest Amount</option>
      </select>
    </div>
    
    <div className="transactionlist">
      <TransactionList 
        transactions={processedTransactions} 
        deleteTransaction={deleteTransaction}
      /> 
    </div>

  </div>
  );
}

export default Dashboard;
  