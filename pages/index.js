/* globals fetch */
import React from "react";
import { pubAddressData, clearBalances } from "../lib/reducers";

import MyWallet from "../components/MyWallet";
import UnlockWallet from "../components/UnlockWallet/UnlockWallet";

export default class Wallet extends React.Component {
  state = { pubAddresses: null, balancesLastUpdated: null };

  setPubAddresses = pubAddresses =>
    this.setState({ pubAddresses }, this.updateBalances);

  updateBalances = async () => {
    this.setState(clearBalances());

    const makeURL = (address) => {
      const insightAPIURL = `https://aayanl.tech/insight-api-zen/`;
      const url = `${insightAPIURL}addr/${address}?noTxList=1`;
      return { address, url };
    };

    const makeRequest = ({ address, url }) => {
      setTimeout(async () => {
        const res = await fetch(url).then(x => x.json());
        const { balance: confirmedBalance, unconfirmedBalance } = res;
        this.setState(pubAddressData(address, { confirmedBalance, unconfirmedBalance }));
      }, 0);
    };

    const addresses = Object.keys(this.state.pubAddresses);

    addresses.map(makeURL).forEach(makeRequest);

    this.setState({ balancesLastUpdated: new Date().toString() });
  };

  render() {
    const { pubAddresses, balancesLastUpdated } = this.state;
    const walletUnlocked = Boolean(pubAddresses);
    return walletUnlocked
      ? <MyWallet
        addressData={pubAddresses}
        updateBalances={this.updateBalances}
        balancesLastUpdated={balancesLastUpdated}
      />
      : <UnlockWallet setPubAddresses={this.setPubAddresses} />;
  }
}
