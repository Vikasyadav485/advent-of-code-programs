import { doOperations, parsedData } from "./puzzel1.js";

const puzzel2 = (data) => {
  for (let i = 0; i <= 99; i++) {
    for (let j = 0; j <= 99; j++) {
      const data = parsedData.slice();
      data[1] = i;
      data[2] = j;
      if (doOperations(data) === 19690720) {
        return 100 * i + j;
      }
    }
  }
};

console.log(puzzel2(parsedData));
