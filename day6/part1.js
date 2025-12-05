// const map = `COM)B
// B)C
// C)D
// D)E
// E)F
// B)G
// G)H
// D)I
// E)J
// J)K
// K)L`;

export const map = Deno.readTextFileSync("./input.txt");

const countSteps = (countsObject, key) => {
  if (countsObject[key] === undefined) return 0;
  if (countsObject[key] === parseInt(countsObject[key])) {
    return countsObject[key];
  }
  return countSteps(countsObject, countsObject[key]) + 1;
};

export const parseMapData = (map) => {
  return map.split("\n").map((x) => x.split(")"));
};

export const dataInObject = (planetsWithOrbits) => {
  const countsObject = {};
  planetsWithOrbits.forEach((element) => {
    countsObject[element[1]] = element[0];
  });
  return countsObject;
};

const noOfOrbits = (map) => {
  const planetsWithOrbits = parseMapData(map);
  const countsObject = dataInObject(planetsWithOrbits);
  for (let index = 0; index < planetsWithOrbits.length; index++) {
    const key = planetsWithOrbits[index][1];
    countsObject[key] = countSteps(countsObject, key);
  }
  return Object.values(countsObject).reduce((a, b) => a + b);
};

console.log(noOfOrbits(map));
