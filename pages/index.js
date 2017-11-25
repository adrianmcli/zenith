/* globals fetch */
import React from "react";
import MyWallet from "../components/MyWallet";
import UnlockWallet from "../components/UnlockWallet";
import { getPubAddresses } from "../lib/utils";

export default class Wallet extends React.Component {
  state = { privKeys: null, pubAddresses: null };

  setNewPrivateKeys = (privKeys) => {
    const pubAddresses = getPubAddresses(privKeys);
    this.setState({ privKeys, pubAddresses }, this.updatePubAddressesInfo);
  };

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

  updatePubAddressesInfo = async () => {
    const addresses = Object.keys(this.state.pubAddresses);
    const addressesWithURLs = addresses.map((address) => {
      const insightAPIURL = `https://aayanl.tech/insight-api-zen/`;
      const url = `${insightAPIURL}addr/${address}?noTxList=1`;
      return { address, url };
    });

    // fetch and set data one by one
    /* eslint-disable no-restricted-syntax, no-await-in-loop */
    for (const item of addressesWithURLs) {
      const res = await fetch(item.url).then(x => x.json());
      this.setPubAddressInfo(item.address, {
        confirmedBalance: res.balance,
        unconfirmedBalance: res.unconfirmedBalance,
      });
    }
    /* eslint-enable */
  };

  render() {
    const { pubAddresses } = this.state;
    const walletUnlocked = Boolean(pubAddresses);
    return (
      <div>
        {walletUnlocked
          ? <MyWallet pubAddresses={pubAddresses} />
          : <UnlockWallet setNewPrivateKeys={this.setNewPrivateKeys} />}
      </div>
    );
  }
}
