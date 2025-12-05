import { permutations } from "jsr:@std/collections";

export const numbersArray = Deno.readTextFileSync("./input.txt").split(",").map(
  (x) => parseInt(x),
);

const possibleSequences = permutations([0, 1, 2, 3, 4]);

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

const lessThan = (numbers, index, instructions) => {
  numbers[numbers[index + 3]] = value(numbers, index + 1, instructions.at(-3)) <
      value(numbers, index + 2, instructions.at(-4))
    ? 1
    : 0;
  return index + 4;
};

const areEqual = (numbers, index, instructions) => {
  numbers[numbers[index + 3]] =
    value(numbers, index + 1, instructions.at(-3)) ===
        value(numbers, index + 2, instructions.at(-4))
      ? 1
      : 0;
  return index + 4;
};

const jump = (numbers, index, instructions) => {
  if (value(numbers, index + 1, instructions.at(-3)) !== 0) {
    return value(numbers, index + 2, instructions.at(-4));
  }
  return index + 3;
};

const jumpIfFalse = (numbers, index, instructions) => {
  if (value(numbers, index + 1, instructions.at(-3)) === 0) {
    return value(numbers, index + 2, instructions.at(-4));
  }
  return index + 3;
};

const input = (numbers, index, instructions, input, output) => {
  numbers[numbers[index + 1]] = input[0];
  input[0] = input[1];
  return index + 2;
};

const output = (numbers, index, instructions, input, output) => {
  output[0] = value(numbers, index + 1, instructions.at(-3));
  return numbers.length;
};

const halt = (numbers) => {
  return numbers.length;
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
  99: halt,
};

const followInstructions = (numbersArray, input) => {
  const numbers = numbersArray.slice();
  let index = 0;
  const output = [];
  while (index < numbers.length) {
    const instructions = numbers[index].toString();
    const instruction = parseInt(instructions.slice(-2));
    index = doSomething[instruction.toString()](
      numbers,
      index,
      instructions,
      input,
      output,
    );
  }
  return output[0];
};

const thrusterSingnals = (numbersArray, sequences) => {
  return sequences.map((x) => {
    const input = [0, 0];
    for (let index = 0; index < x.length; index++) {
      input[0] = x[index];
      input[1] = followInstructions(numbersArray, input);
      if (index === x.length - 1) return input[1];
    }
  });
};

const maximumThrusterSignal = (numbersArray, sequences) => {
  return Math.max(...thrusterSingnals(numbersArray, sequences));
};

console.log(maximumThrusterSignal(numbersArray, possibleSequences));
