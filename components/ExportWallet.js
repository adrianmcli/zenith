import React from "react";
import QRCode from "qrcode.react";

export default class ExportWallet extends React.Component {
  state = {
    publicAddress: ``,
    privateKey: ``,
  };

  handleChange = (e) => {
    const publicAddress = e.target.value;

    this.setState({
      publicAddress,
      privateKey: this.props.addressData[publicAddress].privateKeyWIF,
    });
  };

  render() {
    const { addressDataList } = this.props;
    const addressList = addressDataList.map(x => x[0]);
    return (
      <div>
        Printable Wallet <br />
        <select value={this.state.publicAddress} onChange={this.handleChange}>
          {addressList.map(x => (
            <option key={x} value={x}>
              {x}
            </option>
          ))}
        </select>
        <br />
        {this.state.publicAddress ? (
          <div>
            Public Address
            <QRCode value={this.state.publicAddress} />
            Private Key
            <QRCode value={this.state.privateKey} />
          </div>
        ) : null}
        <br />
        Private Key Dump //TODO
        {/* <button onClick={this.savePrivateKeys}>Download Private Keys</button> */}
      </div>
    );
  }
}
