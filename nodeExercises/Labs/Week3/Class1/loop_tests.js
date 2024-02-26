const generateTestArray = () => {
  const bigArray = [];
  for (let i = 0; i < 1_000_000; ++i) {
    // newish way to do big ints
    bigArray.push({
      a: i,
      b: i / 2,
      r: 0,
    });
  }
  return bigArray;
};

const readArrayWithMap = () => {
  const mapArray = generateTestArray();
  const startMap = performance.now();
  let newArray = mapArray.map((x) => x.b + x.b);
  const endMap = performance.now();

  return `Speed [map]: ${endMap - startMap} miliseconds`;
};

const readArrayWithFor = () => {
  const bigArray = generateTestArray();
  const startFor = performance.now();
  for (let i = 0; i < bigArray.length; ++i) {
    bigArray[i].b + bigArray[i].b;
  }
  const endFor = performance.now();
  return `Speed [for]: ${endFor - startFor} miliseconds`;
};

const readArrayWithForOf = () => {
  let x;
  const bigArray = generateTestArray();
  const startForOf = performance.now();
  for (x of bigArray) {
    x.b + x.b;
  }
  const endForOf = performance.now();
  return `Speed [forOf]: ${endForOf - startForOf} miliseconds`;
};

const readArrayWithForEach = () => {
  const bigArray = generateTestArray();
  const startForEach = performance.now();
  bigArray.forEach((x) => x.b + x.b);
  const endForEach = performance.now();
  return `Speed [forEach]: ${endForEach - startForEach} miliseconds`;
};

export {
  readArrayWithMap,
  readArrayWithFor,
  readArrayWithForOf,
  readArrayWithForEach,
};
