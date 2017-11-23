/* eslint-disable no-plusplus */
import bitcoinjs from "bitcoinjs-lib";
import bip32utils from "bip32-utils";
import zencashjs from "zencashjs";

export const getPrivateKeysFromPassphrase = (passphrase) => {
  // seed key, make it strong
  const seedHex = Buffer.from(passphrase).toString(`hex`);

  // make chain
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

export const getPublicAddressesFromPrivateKeys = (privateKeys) => {
  const publicAddresses = {};
  const compressPubKey = false;
  const useTestNet = true;

  for (var i = 0; i < privateKeys.length; i++) {
    const pubKeyHash = useTestNet
      ? zencashjs.config.testnet.wif
      : zencashjs.config.mainnet.wif;

    var c_pk_wif;
    var c_pk = privateKeys[i];

    // If not 64 length, probs WIF format
    if (c_pk.length !== 64) {
      c_pk_wif = c_pk;
      c_pk = zencashjs.address.WIFToPrivKey(c_pk);
    } else {
      c_pk_wif = zencashjs.address.privKeyToWIF(c_pk);
    }

    var c_pk_wif = zencashjs.address.privKeyToWIF(c_pk, true, pubKeyHash);
    const c_addr = _privKeyToAddr(c_pk, compressPubKey, useTestNet);

    publicAddresses[c_addr] = {
      privateKey: c_pk,
      privateKeyWIF: c_pk_wif,
      confirmedBalance: `loading...`,
      unconfirmedBalance: `loading...`,
    };
  }

  return publicAddresses;
};

// this is an internal function, consider refactoring
function privKeyToAddr(pk, compressPubKey, useTestNet) {
  // if not length 64, prob WIF format
  const privateKey = pk.length !== 64 ? zencashjs.address.WIFToPrivKey(pk) : pk;

  // get tools
  const { privKeyToPubKey, pubKeyToAddr } = zencashjs.address;
  const { testnet, mainnet } = zencashjs.config;

  // convert public key to public address
  const pubKey = privKeyToPubKey(privateKey, compressPubKey);
  const pubKeyHash = useTestNet ? testnet.pubKeyHash : mainnet.pubKeyHash;
  const publicAddr = pubKeyToAddr(pubKey, pubKeyHash);

  return publicAddr;
}
