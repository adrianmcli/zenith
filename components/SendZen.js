import React from "react";
import zencashjs from "zencashjs";

export default class SendZen extends React.Component {
  state = {
    fromAddress: null,
    toAddress: null,
    sendAmount: 0,
    fee: 0,
  };

  handleChange = key => e => this.setState({ [key]: e.target.value });
  handleSubmit = async () => {
    console.log(`in here`);
    const {
      fromAddress, toAddress, sendAmount, fee,
    } = this.state;
    const { addressData } = this.props;
    const insightAPIURL = `https://aayanl.tech/insight-api-zen/`;

    // Convert how much we wanna send
    // to satoshis
    const satoshisToSend = Math.round(sendAmount * 100000000);
    const satoshisfeesToSend = Math.round(fee * 100000000);
    const targetSatoshis = satoshisToSend + satoshisfeesToSend;
    const recipients = [{ address: toAddress, satoshis: satoshisToSend }];

    // Private key
    const { senderPrivateKey } = addressData[fromAddress];

    // Build URLs for transaction
    const prevTxURL = `${insightAPIURL}addr/${fromAddress}/utxo`;
    const infoURL = `${insightAPIURL}status?q=getInfo`;
    const sendRawTxURL = `${insightAPIURL}tx/send`;

    // Build transaction object
    const utxoList = await fetch(prevTxURL).then(x => x.json());
    const infoResponse = await fetch(infoURL).then(x => x.json());

    const blockHeight = infoResponse.info.blocks - 300;
    const blockHashURL = `${insightAPIURL}block-index/${blockHeight}`;

    const BHresponse = await fetch(blockHashURL).then(x => x.json());
    const { blockHash } = BHresponse;

    // Appends cumulative value of each item in utxoList
    const historyWithCum = utxoList
      .filter(x => x.confirmations !== 0)
      // Only retrieve relevant attributes from utxoList
      .map(({
        txid, vout, scriptPubKey, satoshis,
      }) => ({
        txid,
        vout,
        scriptPubKey,
        satoshis,
      }))
      .reduce((acc, curr, idx) => {
        if (!acc.length) {
          return [{ ...curr, cumSatoshis: curr.satoshis }];
        }
        const prevItem = acc[idx - 1];
        const cumSatoshis = prevItem.cumSatoshis + curr.satoshis;
        return [...acc, { ...curr, cumSatoshis }];
      }, []);

    console.log(historyWithCum);

    // Create new list with the cumulative utxos sufficient to meet target amount
    const prunedHistoryWithCum = historyWithCum.reduce((acc, curr, idx) => {
      // base case for first iteration
      if (!acc.length) {
        return [curr];
      }
      const prevItem = historyWithCum[idx - 1];
      const sufficient = prevItem.cumSatoshis >= targetSatoshis;
      return sufficient ? acc : [...acc, curr];
    }, []);

    const lastItem = x => x[x.length - 1];

    // This is a boolean telling us if we have enough satoshis for the txn
    const historySufficient = lastItem(prunedHistoryWithCum).cumSatoshis >= targetSatoshis;
    if (!historySufficient) alert(`not enough confirmed ZEN to perform transaction`);

    // Create transaction object
    let txObj = await zencashjs.transaction.createRawTx(
      prunedHistoryWithCum,
      recipients,
      blockHeight,
      blockHash,
    );
    console.log(txObj);

    for (let i = 0; i < prunedHistoryWithCum.length; i++) {
      txObj = zencashjs.transaction.signTx(
        txObj,
        i,
        senderPrivateKey,
      );
    }

    console.log(`second time: ${txObj}`);

    const txHexString = zencashjs.transaction.serializeTx(txObj);
    
    const sendRes = await fetch(sendRawTxURL, {
      method: `post`,
      body: txHexString,
    }).then(x => x.json());
    console.log(sendRes);
  };

  render() {
    const { addressData } = this.props;
    const addressDataList = Object.entries(addressData);
    const addressList = addressDataList.map(x => x[0]);

    return (
      <div>
        <div>{this.state.fromAddress}</div>
        <select value={this.state.fromAddress} onChange={this.handleChange(`fromAddress`)}>
          {addressList.map(x => <option value={x}>{x}</option>)}
        </select>
        <br />
        <input
          value={this.state.toAddress}
          type="text"
          placeholder="znSDvF9nA5VCdse5HbEKmsoNbjCbsEA3VAH"
          onChange={this.handleChange(`toAddress`)}
        />
        <br />
        Amount:
        <input
          value={this.state.sendAmount}
          type="text"
          placeholder="e.g. 42"
          onChange={this.handleChange(`sendAmount`)}
        />
        <br />
        Fee:
        <input
          value={this.state.fee}
          type="text"
          placeholder="e.g. 0.001"
          onChange={this.handleChange(`fee`)}
        />
        <br />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}
