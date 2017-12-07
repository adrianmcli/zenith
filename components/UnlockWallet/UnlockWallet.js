import React from "react";
import styled from "styled-components";
import HDWallet from "./HDWallet";
import PrivateKey from "./PrivateKey";
import GenerateNew from './GenerateNew';

import { Tomato, Title, BodyText, Hr } from '../common/core';

const TextLogo = styled.h1`
  font-size: 24px;
  letter-spacing: 6px;
  margin-bottom: 48px;
`;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
`;

const Content = styled.div`
  width: 100%;
  max-width: 480px;
  padding: 36px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  z-index: 1;

  @media screen and (min-width: 600px) {
    width: 80%;
  }

  @media screen and (min-width: 900px) {
    width: 480px;
  }
`;

const Description = styled.div`
  margin-bottom: 48px;
`;

const Splash = styled.div`
  flex: 1;
  height: 100%;
  background: rgba(0, 0, 0, 0) url("https://www.toptal.com/designers/subtlepatterns/patterns/playstation-pattern.png") repeat scroll 0% 0%;
  z-index: 0;

  @media screen and (min-width: 900px) {
    background: url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D') no-repeat center center fixed;
    background-size: cover;
  }
`;

const TabGroup = styled.div`
  display: flex;
  margin-bottom: 24px;
  align-items: center;
`;

const Tab = styled.div`
  color: ${p => (p.active ? `tomato` : `unset`)};
  border-bottom: 2px solid;
  border-color: ${p => (p.active ? `tomato` : `transparent`)};
  padding: 8px;
  margin-left: 8px;
  margin-right: 8px;
  cursor: pointer;
  transition: border-color 200ms, color 200ms;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    color: ${p => (p.active ? `tomato` : `rgba(0,0,0,0.5)`)};
  }
`;

const TabDivider = styled.div`
  border-right: 2px solid rgba(0,0,0,0.05);
  height: 24px;
`;

export default class UnlockWallet extends React.Component {
  state = { unlockMethod: `HD_WALLET` };

  changeUnlockMethod = methodName => () =>
    this.setState({ unlockMethod: methodName });

  renderUnlockMethod = () => {
    const { unlockMethod } = this.state;
    if (unlockMethod === `HD_WALLET`) {
      return <HDWallet setPubAddresses={this.props.setPubAddresses} />;
    } else if (unlockMethod === `PRIV_KEY`) {
      return <PrivateKey setPubAddresses={this.props.setPubAddresses} />;
    } else if (unlockMethod === `GEN_NEW`) {
      return <GenerateNew setPubAddresses={this.props.setPubAddresses} />;
    }
    return null;
  };

  render() {
    const { unlockMethod } = this.state;
    return (
      <Container>
        <Content>
          <TextLogo><Tomato>ZEN</Tomato>ITH</TextLogo>
          <Description>
            <Title>Unlock your wallet.</Title>
            <BodyText>
              Choose your method of unlocking a ZenCash wallet.
            </BodyText>
          </Description>
          <TabGroup>
            <Tab
              active={unlockMethod === `HD_WALLET`}
              onClick={this.changeUnlockMethod(`HD_WALLET`)}
            >
              Passphrase
            </Tab>
            <TabDivider />
            <Tab
              active={unlockMethod === `PRIV_KEY`}
              onClick={this.changeUnlockMethod(`PRIV_KEY`)}
            >
              Private Key
            </Tab>
            <TabDivider />
            <Tab
              active={unlockMethod === `GEN_NEW`}
              onClick={this.changeUnlockMethod(`GEN_NEW`)}
            >
              New Wallet
            </Tab>
          </TabGroup>
          {this.renderUnlockMethod()}
        </Content>
        <Splash />
      </Container>
    );
  }
}
