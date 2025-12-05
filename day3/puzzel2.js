import {
  a,
  b,
  isBetween,
  manhattenDistance,
  wire1ranges,
  wire2ranges,
} from "./puzzel1.js";

const findPoints = (ranges1, ranges2) => {
  const intersections = [];
  for (let i = 1; i < ranges2.length - 1; i++) {
    for (let j = 0; j < ranges1.length - 1; j++) {
      if (
        (isBetween(ranges2[i][0], ranges1[j][0], ranges1[j + 1][0]) &&
          isBetween(ranges1[j][1], ranges2[i][1], ranges2[i + 1][1]))
      ) {
        intersections.push([j, i, [ranges2[i][0], ranges1[j][1]]]);
      }
      if (
        (isBetween(ranges2[i][1], ranges1[j][1], ranges1[j + 1][1]) &&
          isBetween(ranges1[j][0], ranges2[i][0], ranges2[i + 1][0]))
      ) {
        intersections.push([j, i, [ranges1[j][0], ranges2[i][1]]]);
      }
    }
  }
  return intersections;
};

const points = findPoints(wire1ranges, wire2ranges);

const countSteps = (points) => {
  const requiredStepsForA = a.slice(0, points[0]).reduce(
    (x, y) => x + parseInt(y.slice(1)),
    0,
  );
  const requiredStepsForB = b.slice(0, points[1]).reduce(
    (x, y) => x + parseInt(y.slice(1)),
    0,
  );

  const remainingStepsForA = manhattenDistance(
    wire1ranges[points[0]],
    points[2],
  );
  const remainingStepsForB = manhattenDistance(
    wire2ranges[points[1]],
    points[2],
  );
  return remainingStepsForA + remainingStepsForB + requiredStepsForA +
    requiredStepsForB;
};

const requiredSteps = points.map((x) => countSteps(x));
console.log(Math.min(...requiredSteps));
