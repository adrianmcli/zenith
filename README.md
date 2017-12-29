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

![screenshot](https://user-images.githubusercontent.com/943555/34443683-c48ee636-ec96-11e7-911f-570993a300bc.png)

## Installation

```bash
npm install
```

## Start

Serve pages to localhost:3000
```bash
yarn dev
``` 

Code is in `SendZen.js`

## Reproduction steps

1. Unlock wallet in first textbox using the secret passphrase.
2. Select the first address for the dropdown (duplicate address should appear right above it if selected properly)
ztpt...yfmh - should have 60 ZEN

3. Select any of the other addresses in the list below as the recipient

4. Amount: 5, Fee: 0.000001

## Variable dump from this flow

```
cumulative history: 
 [{"txid":"28f3...2d45","vout":0,"scriptPubKey":"76a9...02b4","satoshis":1000000000,"cumSatoshis":1000000000}]

recipients: 
[{"address":"ztfp...fBc7","satoshis":500000000},{"address":"ztpt...yfmh","satoshis":499999900}]

private key: 
<redacted>

txObj (pre-sign): 
{"locktime":0,"version":1,"ins":[{"output":{"hash":"28f3...2d45","vout":0},"script":"","prevScriptPubKey":"76a9...02b4","sequence":"ffffffff"}],"outs":[{"script":"76a9...02b4","satoshis":500000000},{"script":"76a9...02b4","satoshis":499999900}]}

txObj (post-sign): 
{"locktime":0,"version":1,"ins":[{"output":{"hash":"28f3...2d45","vout":0},"script":"4730...8b86","prevScriptPubKey":"76a9...02b4","sequence":"ffffffff"}],"outs":[{"script":"76a9...02b4","satoshis":500000000},{"script":"76a9...02b4","satoshis":499999900}]}

txHexString: 
0100...0000
```
