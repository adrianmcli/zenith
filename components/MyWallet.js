import React from "react";
import AddressInfo from "./AddressInfo";
import SendZen from "./SendZen";
import ExportWallet from "./ExportWallet";

const sum = arr => arr.reduce((a, b) => a + b, 0);

export default ({ addressData, updateBalances, balancesLastUpdated }) => {
  const addressDataList = Object.entries(addressData);

  const confirmedBalanceList = addressDataList.map(x => x[1].confirmedBalance);
  const unconfirmedBalanceList = addressDataList.map(x => x[1].unconfirmedBalance);

  const totalBalance = {
    confirmed: sum(confirmedBalanceList),
    unconfirmed: sum(unconfirmedBalanceList),
  };
  const balancesReady = !Number.isNaN(totalBalance.confirmed);
  return (
    <div>
      <SendZen addressData={addressData} />
      <br />
      <ExportWallet addressDataList={addressDataList} addressData={addressData} />
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
        {addressDataList.map(([address, data]) => (
          <AddressInfo
            key={address}
            address={address}
            confirmedBalance={data.confirmedBalance}
            unconfirmedBalance={data.unconfirmedBalance}
          />
        ))}
      </div>
    </div>
  );
};
