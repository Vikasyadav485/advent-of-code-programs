const memory = Deno.readTextFileSync("./input.txt");
const memoryArray = memory.split(",").map((x) => parseInt(x));

memoryArray[1] = 12;
memoryArray[2] = 2;

const add = (index) => {
  memoryArray[memoryArray[index + 3]] = memoryArray[memoryArray[index + 1]] +
    memoryArray[memoryArray[index + 2]];
  return;
};

const multi = (index) => {
  memoryArray[memoryArray[index + 3]] = memoryArray[memoryArray[index + 1]] *
    memoryArray[memoryArray[index + 2]];
  return;
};

const doSomething = {
  1: add,
  2: multi,
};

const doOperations = (memoryArray) => {
  for (let index = 0; index < memoryArray.length; index = index + 4) {
    if (memoryArray[index] === 99) return;
    doSomething[memoryArray[index]](index);
  }
};

doOperations(memoryArray);

console.log(memoryArray);
