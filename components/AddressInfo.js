import React from "react";

const AddressInfo = ({ address, confirmedBalance, unconfirmedBalance }) => {
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

AddressInfo.defaultProps = {
  confirmedBalance: `N/A`,
  unconfirmedBalance: `N/A`,
};

export default AddressInfo;
