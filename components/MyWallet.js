import React from "react";
import AddressInfo from "./AddressInfo";

const sum = arr => arr.reduce((a, b) => a + b, 0);

export default ({ addressData, updateBalances, balancesLastUpdated }) => {
  const addressDataList = Object.entries(addressData);

  const confirmeBalanceList = addressDataList.map(x => x[1].confirmedBalance);
  const unconfirmeBalanceList = addressDataList.map(x => x[1].unconfirmedBalance);

  const totalBalance = {
    confirmed: sum(confirmeBalanceList),
    unconfirmed: sum(unconfirmeBalanceList),
  };
  const balancesReady = !Number.isNaN(totalBalance.confirmed);
  return (
    <div>
      <h1>My Wallet (Unlocked)</h1>
      <div>Last Update Requested: {balancesLastUpdated}</div>
      <button onClick={updateBalances}>Update Balances</button>
      <div>
        Total (confirmed):
        {balancesReady ? totalBalance.confirmed : `Loading...`}
      </div>
      <div>
        Total (unconfirmed):
        {balancesReady ? totalBalance.unconfirmed : `Loading...`}
      </div>
      <div>
        {addressDataList.map(x => (
          <AddressInfo
            address={x[0]}
            confirmedBalance={x[1].confirmedBalance}
            unconfirmedBalance={x[1].unconfirmedBalance}
          />
        ))}
      </div>
    </div>
  );
};
