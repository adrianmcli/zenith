import React from "react";
import { getPubAddresses } from "../../lib/utils";
import { BodyText } from "../common/core";

export default class PrivateKey extends React.Component {
  state = { privateKey: `` };

  handleChange = e => this.setState({ privateKey: e.target.value });

  handleSubmit = () => {
    const { privateKey } = this.state;
    const { setPubAddresses } = this.props;

    // Single address because each PK is tied to only one address
    const pubAddress = getPubAddresses([privateKey]);
    setPubAddresses(pubAddress);
  };

  render() {
    return (
      <div>
        <BodyText>Enter in your private key:</BodyText>
        <input
          type="text"
          value={this.state.privateKey}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}
