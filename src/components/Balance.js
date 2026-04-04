import React from 'react';

function Balance({transactions}) {
  let total = 0;

  for (let i = 0; i < transactions.length; i++) {
    total += transactions[i].amount;
  }
  
  return (
    <div>
      <h2>Current Balance</h2>
      <h1>₹ {total}</h1>
    </div>
  );
}

export default Balance; 