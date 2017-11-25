/* eslint-disable no-plusplus */
import bitcoinjs from "bitcoinjs-lib";
import bip32utils from "bip32-utils";
import zencashjs from "zencashjs";

export const getPrivateKeys = (passphrase) => {
  // seed key, make it strong
  const seedHex = Buffer.from(passphrase).toString(`hex`);

  // make wallet chain
  const hdNode = bitcoinjs.HDNode.fromSeedHex(seedHex);
  const chain = new bip32utils.Chain(hdNode);

  // call chain.next() 42 times to generate addresses
  for (let i = 0; i < 42; i += 1) {
    chain.next();
  }

  // get private keys from the chain
  const privateKeys = chain.getAll().map(x => chain.derive(x).keyPair.toWIF());

  return privateKeys;
};

export const getPubAddresses = (
  privateKeys,
  opts = { compressPubKey: false, useTestNet: true },
) => {
  const publicAddresses = {};

  // get public key hash
  const { testnet, mainnet } = zencashjs.config;
  const pubKeyHash = opts.useTestNet ? testnet.wif : mainnet.wif;

  privateKeys.forEach((pk) => {
    const { WIFToPrivKey, privKeyToWIF } = zencashjs.address;

    // get non-WIF private key
    const pkIsWIF = pk.length !== 64;
    const privateKey = pkIsWIF ? WIFToPrivKey(pk) : pk;

    // generate hashed private key in WIF and save it
    const privateKeyWIF = privKeyToWIF(privateKey, true, pubKeyHash);
    const address = privKeyToAddr(pk, opts.compressPubKey, opts.useTestNet);

    publicAddresses[address] = {
      privateKey,
      privateKeyWIF,
      confirmedBalance: `loading...`,
      unconfirmedBalance: `loading...`,
    };
  });

  return publicAddresses;
};

// this is an internal function, consider refactoring
function privKeyToAddr(pk, compressPubKey, useTestNet) {
  // get non-WIF private key
  const { WIFToPrivKey } = zencashjs.address;
  const pkIsWIF = pk.length !== 64;
  const privateKey = pkIsWIF ? WIFToPrivKey(pk) : pk;

  // get public key hash
  const { testnet, mainnet } = zencashjs.config;
  const pubKeyHash = useTestNet ? testnet.pubKeyHash : mainnet.pubKeyHash;

  // convert public key to public address
  const { privKeyToPubKey, pubKeyToAddr } = zencashjs.address;
  const pubKey = privKeyToPubKey(privateKey, compressPubKey);
  const publicAddr = pubKeyToAddr(pubKey, pubKeyHash);

  return publicAddr;
}
