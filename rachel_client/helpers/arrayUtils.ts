export const deepCopy = (arr) => {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    res.push(arr[i]);
  }
  return res;
};
