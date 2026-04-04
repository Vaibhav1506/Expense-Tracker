import React from 'react';
import '../styles/reports.css';

function About(){
    return(
        <div>
            <h1>How it works</h1>
            <p style = {{textAlign: "center", fontWeight: "bold", textDecoration: "underline"}}>A simple page for FAQ.</p>
            <div style = {{lineHeight: "1.5"}} className = "day-group">
                <h3>What is the project about?</h3>
                <p>The project is about a simple Expense Tracker demonstrated via using the React JS platform. It contains<br/>
                 3 pages currently showing Dashboard, Reports and About page for FAQ purposes.</p>
            </div>

            <div style = {{lineHeight: "1.5"}} className = "day-group">
                <h3>What do the Dashboard page do?</h3>
                <p>The Dashboard page is for adding income or expense with description and an amount. Further more you <br/>
                can track the transactions you made at particular time and date. You can filter the transactions made <br/>
                on the basis of their type (expense / income) or sort on the basis of newest, oldest, highest or lowest <br/>
                transaction.</p>
            </div>

            <div style = {{lineHeight: "1.5"}} className = "day-group">
                <h3>What do the Reports page do?</h3>
                <p>The is the analysis page. Here you can see a graph plotted between the income and expenses on a particular <br/>
                days over a period of time. Other than that there are cards displaying Gross Balance, Income, Expense, Savings<br/>
                Rate, Highest income, expense and current days expense and income which resets every day to zero. The Daily <br/>
                Transaction list displays the expenses / income in seperate cards sorted by each day with the highest income<br/>
                and expense highlighted. It also displays the daily expense, income and the net loss or profit for that day thus<br/>
                indicating whether it was a profit or loss day.
                </p>
            </div>
            
            <div style = {{lineHeight: "1.5"}} className = "day-group">
                <h3>What is the codebase involved ?</h3>
                <p>The codebase is predominantly javascript or JS written in React JS with mainly JSX syntax. The filtering and sorting <br/>
                is implemented using react hooks which involving <b>useState()</b> and the modifier function is called when the select <br/>
                list changes. The underline process is basically that the function when the select or the input box. The Add Transaction <br/>
                in the Dashboard uses <b>useState()</b> as well as <b>useEffect()</b> which basically tracks for changes in the transactions <br/>
                list so that it can update it later if more transactions are added. Local Storage is also used for retaining changes previously <br/>
                Although it has limited storage size, it is used for a general purpose for storage and updates using the <b><u>useEffect()</u></b> <br/>
                checking for changes in the transactions array.
                </p>    
            </div>

            <div style = {{lineHeight :"1.5"}} className = "day-group">
                <h3>How does the NavBar work ? </h3>
                <p>The NavBar works by a simple DOM Routing using the <b>react-dom-client</b> which basically helps in managing multiple<br/>
                pages via the <b>Route</b> and <b>Link</b> tags. </p>
            </div>
        </div>  
    );
}

export default About;