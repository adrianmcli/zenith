import React from "react";
import styled from "styled-components";
import { getPrivateKeys, getPubAddresses } from "../../lib/utils";
import { BodyText } from "../common/core";
import Button from "../common/Button";

const Input = styled.input`
  display: block;
  padding: 6px;
  width: 100%;
  margin-bottom: 16px;
`;

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
        <BodyText>Enter in your passphrase:</BodyText>
        <Input
          type="text"
          value={this.state.passphrase}
          onChange={this.handleChange}
        />
        <Button onClick={this.handleSubmit}>Submit</Button>
        <BodyText>No passphrase? Generate a new wallet:</BodyText>
        <Button>Generate New Wallet</Button>
      </div>
    );
  }
}
