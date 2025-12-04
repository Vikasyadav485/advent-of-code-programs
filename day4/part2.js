const isMeetCriteria = (number) => {
  const string = number.toString();
  let hasTowSameConscutiveDigits = false;
  for (let i = 0; i < string.length; i++) {
    if (string[i + 1] < string[i]) return false;
    let frequncy = 0;
    for (let j = 0; j < string.length; j++) {
      if (string[i] === string[j]) frequncy++;
    }
    if (frequncy === 2) hasTowSameConscutiveDigits = true;
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

console.log(isMeetCriteria(124444));
