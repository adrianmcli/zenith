import React from "react";
import { getPrivateKeys, getPubAddresses } from "../../lib/utils";

export default class HDWallet extends React.Component {
  state = { passphrase: `` };

  handleSubmit = () => {
    const { setPubAddresses } = this.props;
    const privateKeys = getPrivateKeys(this.state.passphrase);
    const pubAddresses = getPubAddresses(privateKeys);
    setPubAddresses(pubAddresses);
  };

  handleChange = (e) => {
    this.setState({ passphrase: e.target.value });
  };

  render() {
    return (
      <div>
        <input type="text" value={this.state.passphrase} onChange={this.handleChange} />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}
