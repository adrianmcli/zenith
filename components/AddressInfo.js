import React from "react";

export default ({ address, confirmedBalance, unconfirmedBalance }) => (
  <div>
    <div>address: {address}</div>
    <div>confirmedBalance: {confirmedBalance}</div>
    <div>unconfirmedBalance: {unconfirmedBalance}</div>
  </div>
);
