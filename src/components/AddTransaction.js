import React, { Component } from 'react';
import '../styles/dashboard.css';

class AddTransaction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      amount: '',
      type: 'income'
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.text.trim() === "" || this.state.amount === ""){
      alert("Please fill the empty fields.");
      return;
    }

    const amountNumber = Number(this.state.amount);
    let current_bal = 0;
    
    for (let i = 0; i < this.props.transactions.length; i++) {
      current_bal += this.props.transactions[i].amount;
    }

    if (this.state.type === "expense" && amountNumber > current_bal){
      alert("Insufficient balance. Transaction addition failed.");
      return;
    }

    const newTransaction = {
      timestamp: Date.now(),
      id: Math.random().toString(36).substring(2, 9), 
      text: this.state.text,
      amount: (this.state.type === "expense" ? -amountNumber : amountNumber),
      date: new Date().toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}),
      time: new Date().toLocaleTimeString('en-IN', {hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false})
    };
    
    this.props.setTransactions(prev => [newTransaction, ...prev]);

    this.setState({
      text: '',
      amount: '',
      type: this.state.type
    });
  };

  render() {
    return (
      <div>
        <h2>Add Transaction Here</h2>

        <form onSubmit={this.handleSubmit} className = "form">
          <select value={this.state.type}
            onChange={(e) => this.setState({ type: e.target.value })}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          
          <input
            type="text"
            placeholder="Enter description"
            value={this.state.text}
            onChange={(e) => this.setState({text: e.target.value})}
          />

          <input
            type="number"
            placeholder="Enter amount"
            value={this.state.amount}
            onChange={(e) => this.setState({amount: e.target.value})}
          />
          
          <button style = {{width : "90px", alignSelf : "center"}} type="submit">Add</button>
        </form>
      </div>
    );
  }
}

export default AddTransaction;