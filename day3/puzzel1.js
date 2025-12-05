// export const a = ["R75", "D30", "R83", "U83", "L12", "D49", "R71", "U7", "L72"];
// export const b = ["U62", "R66", "U55", "R34", "D71", "R55", "D58", "R83"];

const data = Deno.readTextFileSync("./input.txt").split("\n");
export const a = data[0].split(",");
export const b = data[1].split(",");

const initialValue = [[0], [0]];

const findPointsRanges = (points) => {
  return points.reduce((a, b) => {
    let range;
    if (b[0] === "R") {
      range = [a[a.length - 1][0] + parseInt(b.slice(1)), a[a.length - 1][1]];
    }
    if (b[0] === "L") {
      range = [a[a.length - 1][0] - parseInt(b.slice(1)), a[a.length - 1][1]];
    }
    if (b[0] === "U") {
      range = [a[a.length - 1][0], a[a.length - 1][1] + parseInt(b.slice(1))];
    }
    if (b[0] === "D") {
      range = [a[a.length - 1][0], a[a.length - 1][1] - parseInt(b.slice(1))];
    }
    a.push(range);
    return a;
  }, [[0, 0]]);
};

export const wire1ranges = findPointsRanges(a);
export const wire2ranges = findPointsRanges(b);

export const isBetween = (a, b, c) => {
  return Math.sign(a - b) !== Math.sign(a - c);
};

const findPoints = (ranges1, ranges2) => {
  const intersections = [];
  for (let i = 1; i < ranges2.length - 1; i++) {
    for (let j = 0; j < ranges1.length - 1; j++) {
      if (
        (isBetween(ranges2[i][0], ranges1[j][0], ranges1[j + 1][0]) &&
          isBetween(ranges1[j][1], ranges2[i][1], ranges2[i + 1][1]))
      ) {
        intersections.push([ranges2[i][0], ranges1[j][1]]);
      }
      if (
        (isBetween(ranges2[i][1], ranges1[j][1], ranges1[j + 1][1]) &&
          isBetween(ranges1[j][0], ranges2[i][0], ranges2[i + 1][0]))
      ) {
        intersections.push([ranges1[j][0], ranges2[i][1]]);
      }
    }
  }
  return intersections;
};

export const manhattenDistance = (point1, point2) => {
  return Math.abs(point1[0] - point2[0]) + Math.abs(point1[1] - point2[1]);
};

const minimumDistance = (points) => {
  const distances = points.map((x) => manhattenDistance(x, [0, 0]));
  return Math.min(...distances);
};

const main = () => {
  const intersectionPoints = findPoints(wire1ranges, wire2ranges);
  return minimumDistance(intersectionPoints);
};

// console.log(wire1ranges);
// console.log(wire1ranges, wire2ranges);
// console.log(findPoints(wire1ranges, wire2ranges));
console.log(main());
