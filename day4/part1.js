const isMeetCriteria = (number) => {
  const string = number.toString();
  let hasTowSameConscutiveDigits = false;
  for (let index = 0; index < string.length; index++) {
    if (string[index + 1] < string[index]) return false;
    if (string[index] === string[index + 1]) hasTowSameConscutiveDigits = true;
  }
  return hasTowSameConscutiveDigits;
};

const countPossiblePasswords = (range) => {
  let count = 0;
  for (let index = range[0]; index <= range[1]; index++) {
    if (isMeetCriteria(index)) count++;
  }
  return count;
};

console.log(countPossiblePasswords([108457, 562041]));
