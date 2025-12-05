import { dataInObject, map, parseMapData } from "./part1.js";

const steps = (countsObject, key) => {
  if (countsObject[key] === undefined) return "";
  return steps(countsObject, countsObject[key]) + key + ",";
};

const noOfOrbits = (map) => {
  const planetsWithOrbits = parseMapData(map);
  const countsObject = dataInObject(planetsWithOrbits);
  const pathOfYOU = steps(countsObject, "YOU").split(",");
  const pathOfSAN = steps(countsObject, "SAN").split(",");
  for (let index = 0; index < pathOfSAN.length; index++) {
    if (pathOfSAN[index] !== pathOfYOU[index]) {
      return (pathOfSAN.length - 1) + (pathOfYOU.length - 1) - (2 * index) - 2;
    }
  }
  return;
};

console.log(noOfOrbits(map));
