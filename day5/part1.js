export const numbersArray = Deno.readTextFileSync("./input.txt").split(",").map(
  (x) => parseInt(x),
);

const value = (numbers, index, mode = "0") => {
  if (mode === "0") return numbers[numbers[index]];
  if (mode === "1") return numbers[index];
};

const followInstructions = (numbersArray) => {
  const numbers = numbersArray.slice();
  let index = 0;
  while (index < numbers.length) {
    const instructions = numbers[index].toString();
    const instruction = parseInt(instructions.slice(-2));
    if (instruction === 1) {
      numbers[numbers[index + 3]] =
        value(numbers, index + 1, instructions.at(-3)) +
        value(numbers, index + 2, instructions.at(-4));
      index = index + 4;
    }
    if (instruction === 2) {
      numbers[numbers[index + 3]] =
        value(numbers, index + 1, instructions.at(-3)) *
        value(numbers, index + 2, instructions.at(-4));
      index = index + 4;
    }
    if (instruction === 3) {
      numbers[numbers[index + 3]] = 1;
      index = index + 2;
    }
    if (instruction === 4) {
      console.log(value(numbers, index + 1, instructions.at(-3)));
      index = index + 2;
    }
    if (instruction === 99) {
      return numbers;
    }
  }
  return numbers;
};

followInstructions(numbersArray);
