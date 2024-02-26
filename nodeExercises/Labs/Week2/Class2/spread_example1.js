//spread operator and arrays

// spread operator and arrays
const getOriginalCountries = () => {
    let originalCountries = ['Canada<--original', 'USA<--original'];
    let endCountries = ['England<--End', 'Japan<--End'];
    originalCountries.push(...endCountries); // appends on the end using spread
    return originalCountries;
   };
   const getAllCountries = () => {
    let original = getOriginalCountries();
    let beginCountries = ['Germany<--begin', 'Mexico<--begin'];
    original.unshift(...beginCountries); // appends to beginning using spread
    return original;
   };

   getAllCountries().forEach(country => console.log(country));
