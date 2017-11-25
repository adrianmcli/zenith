import React from "react";
import AddressInfo from "./AddressInfo";

const sum = arr => arr.reduce((a, b) => a + b, 0);

export default ({ addressData }) => {
  const addressDataList = Object.entries(addressData);

  const confirmeBalanceList = addressDataList.map(x => x[1].confirmedBalance);
  const unconfirmeBalanceList = addressDataList.map(x => x[1].unconfirmedBalance);

  const allBalancesReady = addressDataList.every(item => {
    console.log('checking if ready')
    return typeof item.confirmedBalance === `number`
  });
  return (
    <div>
      <h1>My Wallet (Unlocked)</h1>
      <div>
        {addressDataList.map(x => (
          <AddressInfo
            address={x[0]}
            confirmedBalance={x[1].confirmedBalance}
            unconfirmedBalance={x[1].unconfirmedBalance}
          />
        ))}
      </div>
      <div>
        Total (confirmed):
        {allBalancesReady ? sum(confirmeBalanceList) : `Loading...`}
      </div>
      <div>
        Total (unconfirmed):
        {allBalancesReady ? sum(unconfirmeBalanceList) : `Loading...`}
      </div>
    </div>
  );
};
