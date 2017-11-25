import React from "react";
import { getPubAddresses } from "../../lib/utils";

export default class PrivateKey extends React.Component {
  state = { };

  render() {
    return (
      <div>
        <label htmlFor="walletDatFile">
          Select wallet.dat file
          <input
            style={{ display: `none` }}
            type="file"
            name="file"
            id="walletDatFile"
            onChange={this.loadWalletDat}
          />
        </label>
      </div>
    );
  }
}
