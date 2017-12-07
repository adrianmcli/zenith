import React from "react";
import styled from "styled-components";
import { BodyText } from "../common/core";
import Button from "../common/Button";

export default class GenerateNew extends React.Component {
  state = { passphrase: `` };

  render() {
    return (
      <React.Fragment>
        <BodyText>Generate a new wallet:</BodyText>
        <Button>Generate New Wallet</Button>
      </React.Fragment>
    );
  }
}
