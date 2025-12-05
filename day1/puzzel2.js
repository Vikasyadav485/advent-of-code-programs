const modulesString = Deno.readTextFileSync("./modules_for_puzzel1.txt");
const modules = modulesString.split("\n").map((x) => parseInt(x));

const calculateFuelForAModule = (mass) => {
  const requiredFuel = Math.floor(mass / 3) - 2;
  if (requiredFuel <= 0) return 0;
  return requiredFuel + calculateFuelForAModule(requiredFuel);
};

const calculateFuelForManyModules = (moudules) => {
  return moudules.reduce((a, b) => a + calculateFuelForAModule(b), 0);
};

console.log(calculateFuelForManyModules(modules));
