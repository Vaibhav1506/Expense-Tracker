import React from 'react';
import '../styles/reports.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from "recharts";

function Reports({transactions}) {
    let total = 0;
    let income = 0;
    let expense = 0;
    let highestIncome = null;
    let highestExpense = null;
    let today_expense = 0;
    let today_income = 0;

    const count = transactions.length;
    const now = new Date();

    for (let i = 0; i < count; i++) {
        total += transactions[i].amount;
        const d = new Date(transactions[i].timestamp);

        const isSameDay = d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();

        if (transactions[i].amount > 0){
            income += transactions[i].amount;

            if (highestIncome === null || transactions[i].amount > highestIncome.amount){
                highestIncome = transactions[i];
            }
        }

        if (transactions[i].amount < 0){
            expense += transactions[i].amount;

            if (highestExpense === null || transactions[i].amount < highestExpense.amount){
                highestExpense = transactions[i];
            }
        }

        if (isSameDay && transactions[i].amount < 0){
            today_expense += transactions[i].amount;
        }

        if (isSameDay && transactions[i].amount > 0){
            today_income += transactions[i].amount;
        }
    }
    
    const groupedByDate = {};

    for (let i = 0; i < count; i++){
        const date = transactions[i].date;

        if (!groupedByDate[date]){
            groupedByDate[date] = [];
        }        

        groupedByDate[date].push(transactions[i]);
    }

    const groupedArray = Object.entries(groupedByDate);
    let savings = income + expense;
    let savings_percent = (savings / income) * 100;

    const lineData = [...groupedArray].sort((a, b) => {
        return new Date(a[0]) - new Date(b[0]);
    }).map(([date, items]) => {
    let dailyIncome = 0;
    let dailyExpense = 0;

    for (let i = 0; i < items.length; i++) {
        const t = items[i];

        if (t.amount > 0) {
        dailyIncome += t.amount;
        }

        if (t.amount < 0) {
        dailyExpense += Math.abs(t.amount); 
        }
    }

    return {
        date,
        income: dailyIncome,
        expense: dailyExpense
        };
    });
    
    

    return (
        <div>
            <h1 style = {{marginTop: "-25px"}}>Analysis</h1>
            <p style = {{textAlign : "center"}}><b><u>You made about a total of {count} transaction(s) till now</u></b>.</p>
            <p style = {{textAlign : "center"}}>Days with <span className = "income" style = {{fontWeight: "bold", textDecoration: "underline"}}>Profit Day (includes zero)</span> mean you <b><u>SPENT</u></b> more than you <b><u>EARNED</u></b> that day. On that day the green line on graph would be roughly above the red line.</p>
            <p style = {{textAlign : "center"}}>Days with <span className = "expense" style = {{fontWeight: "bold", textDecoration: "underline"}}>Loss Day</span> mean you <b><u>EARNED</u></b> more than you <b><u>SPENT</u></b> that day. On that day the red line on graph would be roughly above the green line.</p>
            {count === 0 ? (
            <p className = 'empty-message'>Analytics will be shown here. Make some transactions on the Dashboard page.</p>
            ) : (                
                <div>
                    <div style={{display: "flex", justifyContent: "center", marginBottom: "50px" }}>
                        <ResponsiveContainer width="70%" height={300}>
                        <LineChart data={lineData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                            
                            <CartesianGrid strokeDasharray="3 3"/>

                            <XAxis dataKey="date" angle={-30} textAnchor="end" interval={0}/>

                            <YAxis tickFormatter={(value) => `₹${value}`}/>

                            <Tooltip formatter={(value) => `₹ ${value}`}/>
                            <Legend verticalAlign = "top" align = "center"/>

                            <Line type="monotone" dataKey="income" stroke="green" strokeWidth={2}/>

                            <Line type="monotone" dataKey="expense" stroke="red" strokeWidth={2}/>
                        </LineChart>
                    </ResponsiveContainer>
                    </div>

                    <div className="reports-container">
                        <div style = {{justifyContent: "center"}} className="report-cards">
                            <div className="card">
                                <h3 onClick = {() => {alert("The total balance after the total incomes and expenses are accounted.")}}>Gross Balance</h3>
                                <p className = "stats">₹ {total}</p>
                            </div>

                            <div className="card">
                                <h3 onClick = {() => {alert("The total income accumulated so far.")}}>Gross Income</h3>
                                <p className="income stats">₹ {income}</p>
                            </div>

                            <div className="card">
                                <h3 onClick = {() => {alert("The total expense accumulated so far.")}}>Gross Expense</h3>
                                <p className="expense stats">₹ {Math.abs(expense)}</p>
                            </div>

                            <div className="card">
                                <h3 onClick = {() => {alert("Savings percentage calculated as (balance / income) * 100")}}>Savings Rate</h3>
                                <p className = "stats">{savings_percent.toFixed(2)}%</p>
                            </div>
                        </div>

                        <br/>

                        <div style = {{justifyContent: "center"}} className="report-cards">
                            <div className="card">
                                <h3 onClick = {() => {alert(`Highest income ever recorded for "${highestIncome.text}" on ${highestIncome.date} at ${highestIncome.time}`)}}>Highest Income</h3>
                                <p className = "stats">₹ {highestIncome ? highestIncome.amount : "No income"}</p>
                            </div>

                            <div className="card">
                                <h3 onClick = {() => {alert(`Highest expense recorded for ${highestExpense.text} on ${highestExpense.date} at ${highestExpense.time}`)}}>Highest Expense</h3>
                                <p className = "stats"> {highestExpense ? "₹" + Math.abs(highestExpense.amount).toString() : "No expense"}</p>
                            </div>

                            <div className = "card">
                                <h3 onClick = {() => {alert("Daily expense spend today so far.")}}>Today's Spendings</h3>
                                <p className = "stats">₹ {Math.abs(today_expense)}</p>
                            </div>

                            <div className = "card">
                                <h3 onClick = {() => {alert("Daily income today so far.")}}>Today's Income</h3>
                                <p className = "stats">₹ {Math.abs(today_income)}</p>
                            </div>
                        </div>

                        <br/><br/>
                        <div className = "daily-reports">
                            <h2 style = {{marginTop: "-25px"}}>Daily Transaction List</h2>
                            <p style = {{textAlign : "center"}}>The whole transactions list will be displayed below if you have added income/expenses from the dashboard page.</p>
                            <p style = {{textAlign : "center"}}>The highest income and expenses are highlighted in red and green for each day.</p>
                            {groupedArray.map(([date, items]) => {
                                let dailyTotal = 0;
                                let dailyExpense = 0;
                                let dailyIncome = 0;
                                let highestDailyIncome = 0;
                                let highestDailyExpense = 0;

                                for (let i = 0; i < items.length; i++) {
                                    dailyTotal += items[i].amount;

                                    if (items[i].amount > 0){
                                        dailyIncome += items[i].amount;

                                        if (highestDailyIncome === null || items[i].amount > highestDailyIncome){
                                            highestDailyIncome = items[i].amount;
                                        }
                                    }

                                    if (items[i].amount < 0){
                                        dailyExpense += items[i].amount;

                                        if (highestDailyExpense === null || items[i].amount < highestDailyExpense){
                                            highestDailyExpense = items[i].amount;
                                        }
                                    }
                                }

                                return (
                                    <div key = {date} className = "day-group">
                                        <h3 style = {{color: dailyTotal >= 0 ? "green" : "red"}}>{dailyTotal >= 0 ? "[Profit Day]" : "[Loss Day]"} {date}</h3>
                                        {items.map((t) => {
                                            return(
                                            <div key = {t.id} className = "day-item">
                                                <span><b style = {{fontFamily: "monospace", fontSize : "15px"}}>[{(t.time)}]</b>&nbsp;&nbsp;{t.text}</span>
                                                <span style = {{color: t.amount === highestDailyIncome ? "green" : t.amount === highestDailyExpense ? "red" : "black",
                                                    fontWeight: t.amount === highestDailyIncome ? "bold" : t.amount === highestDailyExpense ? "bold" : "none"
                                                }}>₹ {t.amount}</span>
                                            </div>
                                            );
                                        })}
                                        <div style = {{display : "flex", alignItems: "center", gap: "25px", justifyContent: "center"}}>
                                            <h3>Daily Expense: ₹ {Math.abs(dailyExpense)}</h3>
                                            <h3>Daily Income: ₹ {dailyIncome}</h3>
                                            <h3 style = {{color: dailyTotal >= 0 ? "green" : "red"}}>Daily Net: ₹ {dailyTotal >= 0 ? "+" + dailyTotal : dailyTotal}</h3>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>      
                    </div>
                </div>
                )}
        </div>
    );
}

export default Reports;