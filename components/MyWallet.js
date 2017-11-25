import React from "react";

export default ({ pubAddresses }) => {
  const addressList = Object.entries(pubAddresses)
  return (
    <div>
      <h1>My Wallet (Unlocked)</h1>
      <div>
      {addressList.map(x => <div>{JSON.stringify(x)}</div>)}
      </div>
    </div>
  );
}
