import React from "react";
import HDWallet from "./HDWallet";
import DATFile from "./DATFile";
import PrivateKey from "./PrivateKey";

export default class UnlockWallet extends React.Component {
  state = {};

  loadWalletDat = () => {};

  render() {
    return (
      <div>
        <HDWallet setPubAddresses={this.props.setPubAddresses} />
        <br />
        <DATFile setPubAddresses={this.props.setPubAddresses} />
        <br />
        <PrivateKey setPubAddresses={this.props.setPubAddresses} />
      </div>
    );
  }
}
