// random colour generator from material design colour file
import matColours from "./matdes100colours.json" assert { type: "json" };
let coloridx = Math.floor(Math.random() * matColours.colours.length) + 1;
console.log(matColours.colours[coloridx]);
