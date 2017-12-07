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

const Status = styled.div`
  color: ${p => (p.error ? `#de1616` : `rgba(0,0,0,0.5)`)};
  display: inline-block;
  margin-left: 12px;
`;

export default class HDWallet extends React.Component {
  state = { passphrase: ``, status: null, error: false };

  handleSubmit = () => {
    const { setPubAddresses } = this.props;
    this.setState({ status: `Unlocking wallet...`, error: false }, () => {
      // allow time for the new status message to render
      setTimeout(() => {
        try {
          const privateKeys = getPrivateKeys(this.state.passphrase);
          const pubAddresses = getPubAddresses(privateKeys);
          this.setState({ status: null });
          setPubAddresses(pubAddresses);
        } catch (err) {
          this.setState({ status: `Passphrase is too short`, error: true });
        }
      }, 10);
    });
  };

  handleChange = (e) => {
    this.setState({ passphrase: e.target.value });
  };

  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.handleSubmit();
    }
  };

  render() {
    return (
      <div>
        <BodyText>Enter in your passphrase:</BodyText>
        <Input
          type="text"
          value={this.state.passphrase}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          placeholder="e.g. cash cow money moon dog rise buy trade etc."
        />
        <Button onClick={this.handleSubmit}>Submit</Button>
        {this.state.status &&
          <Status error={this.state.error}>{this.state.status}</Status>}
      </div>
    );
  }
}
