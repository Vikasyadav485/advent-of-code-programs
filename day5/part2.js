export const numbersArray = Deno.readTextFileSync("./input.txt").split(",").map(
  (x) => parseInt(x),
);

const value = (numbers, index, mode = "0") => {
  if (mode === "0") return numbers[numbers[index]];
  if (mode === "1") return numbers[index];
};

const add = (numbers, index) => {
  numbers[numbers[index + 3]] = value(numbers, index + 1, instructions.at(-3)) +
    value(numbers, index + 2, instructions.at(-4));
  return index + 4;
};

const multi = (numbers, index) => {
  numbers[numbers[index + 3]] = value(numbers, index + 1, instructions.at(-3)) *
    value(numbers, index + 2, instructions.at(-4));
  return index + 4;
};

const lessThan = (numbers, index) => {
  numbers[numbers[index + 3]] = value(numbers, index + 1, instructions.at(-3)) <
      value(numbers, index + 2, instructions.at(-4))
    ? 1
    : 0;
  return index + 4;
};

const areEqual = (numbers, index) => {
  numbers[numbers[index + 3]] =
    value(numbers, index + 1, instructions.at(-3)) ===
        value(numbers, index + 2, instructions.at(-4))
      ? 1
      : 0;
  return index + 4;
};

const jump = (numbers, index) => {
  if (value(numbers, index + 1, instructions.at(-3)) !== 0) {
    return value(numbers, index + 2, instructions.at(-4));
  }
  return index + 3;
};

const jumpIfFalse = (numbers, index) => {
  if (value(numbers, index + 1, instructions.at(-3)) === 0) {
    return value(numbers, index + 2, instructions.at(-4));
  }
  return index + 3;
};

const input = (numbers, index) => {
  numbers[numbers[index + 1]] = 5;
  return index + 2;
};

const output = (input, index) => {
  console.log(value(numbers, index + 1, instructions.at(-3)));
  return index + 2;
};

const doSomething = {
  1: add,
  2: multi,
  3: input,
  4: output,
  5: jump,
  6: jumpIfFalse,
  7: lessThan,
  8: areEqual,
};

const followInstructions = (numbersArray) => {
  const numbers = numbersArray.slice();
  let index = 0;
  while (index < numbers.length) {
    const instructions = numbers[index].toString();
    const instruction = parseInt(instructions.slice(-2));
    index = doSomething[instruction.toString()](numbers, index);
    if (instruction === 99) {
      return numbers;
    }
  }
  return numbers;
};

// followInstructions([3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8]);

console.log(followInstructions(numbersArray));
