const memory = Deno.readTextFileSync("./input.txt");
export const parsedData = memory.split(",").map((x) => parseInt(x));

parsedData[1] = 12;
parsedData[2] = 1;

export const doOperations = (data) => {
  const newData = data.slice();
  for (let index = 0; index < newData.length; index = index + 4) {
    if (newData[index] === 1) {
      newData[newData[index + 3]] = newData[newData[index + 1]] +
        newData[newData[index + 2]];
    }
    if (newData[index] === 2) {
      newData[newData[index + 3]] = newData[newData[index + 1]] *
        newData[newData[index + 2]];
    }
    if (newData[index] === 99) return newData[0];
  }
  return newData[0];
};

console.log(doOperations(parsedData));
