import React from "react";
import { getPrivateKeysFromPassphrase } from "../lib/utils";

export default class UnlockWallet extends React.Component {
  state = { passphrase: `` };

  handleChange = e => this.setState({ passphrase: e.target.value });

  handleSubmit = () => {
    const { passphrase } = this.state;
    const { setNewPrivateKeys } = this.props;
    const privateKeys = getPrivateKeysFromPassphrase(passphrase);
    setNewPrivateKeys(privateKeys);
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
