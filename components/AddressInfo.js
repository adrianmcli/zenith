import React from "react";

export default ({ address, confirmedBalance, unconfirmedBalance }) => {
  const explorerURL = `https://aayanl.tech/`;
  const explorerLinkForAddress = `${explorerURL}address/${address}`;
  return (
    <div>
      <div>
        address:
        <a
          href={explorerLinkForAddress}
          target="_blank"
          rel="noreferrer noopener"
        >
          {address}
        </a>
      </div>
      <div>confirmedBalance: {confirmedBalance}</div>
      <div>unconfirmedBalance: {unconfirmedBalance}</div>
    </div>
  );
};
