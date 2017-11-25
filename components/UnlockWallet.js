import React from "react";
import { getPrivateKeys, getPubAddresses } from "../lib/utils";

export default class UnlockWallet extends React.Component {
  state = { passphrase: `` };

  handleChange = e => this.setState({ passphrase: e.target.value });

  handleSubmit = () => {
    const { passphrase } = this.state;
    const { setPubAddresses } = this.props;
    const privateKeys = getPrivateKeys(passphrase);
    const pubAddresses = getPubAddresses(privateKeys);
    setPubAddresses(pubAddresses);
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.passphrase}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}
