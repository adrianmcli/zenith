/* globals fetch */
import React from "react";
import MyWallet from "../components/MyWallet";
import UnlockWallet from "../components/UnlockWallet";

export default class Wallet extends React.Component {
  state = { pubAddresses: null, balancesLastUpdated: null };

  setPubAddresses = pubAddresses =>
    this.setState({ pubAddresses }, this.updateBalances);

  setPubAddressInfo = (address, newData) =>
    this.setState((prevState) => {
      const oldData = prevState.pubAddresses[address];
      const newAddressData = Object.assign({}, oldData, newData);
      return {
        pubAddresses: {
          ...prevState.pubAddresses,
          [address]: newAddressData,
        },
      };
    });

  updateBalances = async () => {
    this.setState((prevState) => {
      const newPubAddresses = {};
      for (const address in prevState.pubAddresses) {
        newPubAddresses[address] = {
          ...newPubAddresses[address],
          confirmedBalance: undefined,
          unconfirmedBalance: undefined,
        };
      }
      return {
        pubAddresses: newPubAddresses,
      };
    });

    const addresses = Object.keys(this.state.pubAddresses);
    const addressesWithURLs = addresses.map((address) => {
      const insightAPIURL = `https://aayanl.tech/insight-api-zen/`;
      const url = `${insightAPIURL}addr/${address}?noTxList=1`;
      return { address, url };
    });

    /* eslint-disable no-restricted-syntax, no-await-in-loop */
    addressesWithURLs.forEach((item) => {
      // fetch data, but not all at once (by using event loop w/ setTimeout)
      setTimeout(async () => {
        const res = await fetch(item.url).then(x => x.json());
        this.setPubAddressInfo(item.address, {
          confirmedBalance: res.balance,
          unconfirmedBalance: res.unconfirmedBalance,
        });
      }, 0);
    });
    /* eslint-enable */

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
