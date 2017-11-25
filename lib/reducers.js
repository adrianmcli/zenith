/* Note: Reducers are functions that:
 * 1. return a function that,
 * 2. takes in a previous state and returns a new state.
 */

// returns a new state with a specific address's data being updated
export const pubAddressData = (address, newData) => (prevState) => {
  const otherAddresses = prevState.pubAddresses;
  const oldData = prevState.pubAddresses[address];
  const newAddressData = { ...oldData, ...newData };
  return {
    pubAddresses: {
      ...otherAddresses,
      [address]: newAddressData,
    },
  };
};

// returns a new state where all addresses have their balances cleared
export const clearBalances = () => (prevState) => {
  const newPubAddresses = {};
  const addressData = Object.entries(prevState.pubAddresses);

  addressData.forEach(([address, value]) => {
    newPubAddresses[address] = {
      ...value,
      confirmedBalance: undefined,
      unconfirmedBalance: undefined,
    };
  });

  return {
    pubAddresses: newPubAddresses,
  };
};
