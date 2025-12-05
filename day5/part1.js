export const numbersArray = Deno.readTextFileSync("./input.txt").split(",").map(
  (x) => parseInt(x),
);

const value = (numbers, index, mode = "0") => {
  if (mode === "0") return numbers[numbers[index]];
  if (mode === "1") return numbers[index];
};

const add = (numbers, index, instructions) => {
  numbers[numbers[index + 3]] = value(numbers, index + 1, instructions.at(-3)) +
    value(numbers, index + 2, instructions.at(-4));
  return index + 4;
};

const multi = (numbers, index, instructions) => {
  numbers[numbers[index + 3]] = value(numbers, index + 1, instructions.at(-3)) *
    value(numbers, index + 2, instructions.at(-4));
  return index + 4;
};

const input = (numbers, index) => {
  numbers[numbers[index + 1]] = 1;
  return index + 2;
};

const output = (numbers, index, instructions) => {
  console.log(value(numbers, index + 1, instructions.at(-3)));
  return index + 2;
};

const doSomething = {
  1: add,
  2: multi,
  3: input,
  4: output,
};

const followInstructions = (numbersArray) => {
  const numbers = numbersArray.slice();
  let index = 0;
  while (index < numbers.length) {
    const instructions = numbers[index].toString();
    const instruction = parseInt(instructions.slice(-2));
    if (instruction === 99) {
      return;
    }
    index = doSomething[instruction.toString()](numbers, index, instructions);
  }
  return;
};

followInstructions(numbersArray);
