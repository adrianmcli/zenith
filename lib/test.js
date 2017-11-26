const history = [{ satoshis: 15 }, { satoshis: 10 }, { satoshis: 10 }];
const targetSatoshis = 2;

const historyWithCum = history.reduce((acc, curr, idx) => {
  if (!acc.length) {
    return [{ ...curr, cumSatoshis: curr.satoshis }];
  }
  const prevItem = acc[idx - 1];
  const cumSatoshis = prevItem.cumSatoshis + curr.satoshis;
  return [...acc, { ...curr, cumSatoshis }];
}, []);

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

const historySufficient =
  lastItem(prunedHistoryWithCum).cumSatoshis >= targetSatoshis;

console.log(historyWithCum);
console.log(prunedHistoryWithCum);
console.log(historySufficient);
