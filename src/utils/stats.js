export const calculateAverage = (data) => {
  const sum = data.reduce((acc, d) => acc + d.price, 0);
  return sum / data.length;
};

export const calculateStandardDeviation = (data, avg) => {
  const variance = data.reduce((acc, d) => acc + (d.price - avg) ** 2, 0) / (data.length - 1);
  return Math.sqrt(variance);
};

export const pearsonCorrelation = (X, Y) => {
  const n = X.length;
  const avgX = calculateAverage(X);
  const avgY = calculateAverage(Y);
  const cov = X.reduce((acc, x, i) => acc + (x.price - avgX) * (Y[i].price - avgY), 0) / (n - 1);
  const stdX = calculateStandardDeviation(X, avgX);
  const stdY = calculateStandardDeviation(Y, avgY);
  return cov / (stdX * stdY);
};
