<h1 align="center">Zenith</h1> <br>
<p align="center">
  <img alt="Night Sky" src="https://user-images.githubusercontent.com/943555/33152553-02da6b30-cf92-11e7-993d-57da7edf010a.png" width="120">
</p>
<p align="center">A better API wallet for ZenCash</p>

<p align="center">
  <img alt="zen cash" src="https://img.shields.io/badge/zen-cash-ff69b4.svg">
  <img alt="API wallet" src="https://img.shields.io/badge/API-Wallet-blue.svg">
  <img alt="done right" src="https://img.shields.io/badge/done-right-brightgreen.svg">
</p>

---

## Installation

```bash
npm install
```

## Start

Serve pages to localhost:3000
```bash
yarn dev
``` 

## Kendrick: reproduction steps

1. Unlock wallet in first textbox using phrase:
```
funny sentence that about elton power ball gay lol
```

2. select the first address for the dropdown (duplicate address should appear right above it if selected properly)
ztptNFmGhEV3K6qF1VAFTUVpiJBFcutyfmh - should have 60 ZEN

3. select any of the other addresses in the list below as the recipient

4. Amount: 5, Fee: 0.000001

## Variable dump from this flow

```
cumulative history: 
 [{"txid":"28f339fb3f9c69f9e13e6c88ec02c43d628b5117fda40bdea5a966b868a22d45","vout":0,"scriptPubKey":"76a914ee5fb9782b1a11de6608c6e72bb5361a8ef4dca788ac2094c6bd631b3b993e61f18863b8f4928b2d4f6049aee2edaacfe1ac96f0511b0003d37802b4","satoshis":1000000000,"cumSatoshis":1000000000}]

recipients: 
[{"address":"ztfpxn6nAjHMQ4MHSQYNpTGqqGjyhH8fBc7","satoshis":500000000},{"address":"ztptNFmGhEV3K6qF1VAFTUVpiJBFcutyfmh","satoshis":499999900}]

private key: 
3e6254e484291e68235e8148a301c13bf423cc3f1310e4e7b910fa2bba6cf1cf

txObj (pre-sign): 
{"locktime":0,"version":1,"ins":[{"output":{"hash":"28f339fb3f9c69f9e13e6c88ec02c43d628b5117fda40bdea5a966b868a22d45","vout":0},"script":"","prevScriptPubKey":"76a914ee5fb9782b1a11de6608c6e72bb5361a8ef4dca788ac2094c6bd631b3b993e61f18863b8f4928b2d4f6049aee2edaacfe1ac96f0511b0003d37802b4","sequence":"ffffffff"}],"outs":[{"script":"76a9148b01bf398854f997cc98bb3a5f982b141fa27e8b88ac204debeac18bcb4dfabeceae67b21f8446f060774b5439380a4a03c54c9dae110003bc7e02b4","satoshis":500000000},{"script":"76a914ee5fb9782b1a11de6608c6e72bb5361a8ef4dca788ac204debeac18bcb4dfabeceae67b21f8446f060774b5439380a4a03c54c9dae110003bc7e02b4","satoshis":499999900}]}

txObj (post-sign): 
{"locktime":0,"version":1,"ins":[{"output":{"hash":"28f339fb3f9c69f9e13e6c88ec02c43d628b5117fda40bdea5a966b868a22d45","vout":0},"script":"4730440220678bed1cdd5c081bbca82cd618ca5bc42c05186034fb3840f79c29964e298897022012febe16f3eb773be50b09dedd27b998db84399040151dd0b37b2701f63517030121023d042ddc800b811390e2588b3bd2dcb2cd62c087953910371b7e6f3123578b86","prevScriptPubKey":"76a914ee5fb9782b1a11de6608c6e72bb5361a8ef4dca788ac2094c6bd631b3b993e61f18863b8f4928b2d4f6049aee2edaacfe1ac96f0511b0003d37802b4","sequence":"ffffffff"}],"outs":[{"script":"76a9148b01bf398854f997cc98bb3a5f982b141fa27e8b88ac204debeac18bcb4dfabeceae67b21f8446f060774b5439380a4a03c54c9dae110003bc7e02b4","satoshis":500000000},{"script":"76a914ee5fb9782b1a11de6608c6e72bb5361a8ef4dca788ac204debeac18bcb4dfabeceae67b21f8446f060774b5439380a4a03c54c9dae110003bc7e02b4","satoshis":499999900}]}

txHexString: 
0100000001452da268b866a9a5de0ba4fd17518b623dc402ec886c3ee1f9699c3ffb39f328000000006a4730440220678bed1cdd5c081bbca82cd618ca5bc42c05186034fb3840f79c29964e298897022012febe16f3eb773be50b09dedd27b998db84399040151dd0b37b2701f63517030121023d042ddc800b811390e2588b3bd2dcb2cd62c087953910371b7e6f3123578b86ffffffff020065cd1d000000003f76a9148b01bf398854f997cc98bb3a5f982b141fa27e8b88ac204debeac18bcb4dfabeceae67b21f8446f060774b5439380a4a03c54c9dae110003bc7e02b49c64cd1d000000003f76a914ee5fb9782b1a11de6608c6e72bb5361a8ef4dca788ac204debeac18bcb4dfabeceae67b21f8446f060774b5439380a4a03c54c9dae110003bc7e02b400000000
```
