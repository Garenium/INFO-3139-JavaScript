// let idx, val;
// for([idx,val] of ProcessingInstruction.argv.entries()){
//     if(idx > 1 && idx < process.argv.length){
//         //look any arguments after 2nd one
//         switch(val){
//             case "on":
//                 console.log(`We've entered an argument for Ontario`);
//                 break;
//             case "ab":
//                 console.log(`We've entered an argument for Alberta`);
//                 break; 
//             case "bc":
//                 console.log(`We've entered an argument for Alberta`);
//                 break; 
//             default:
//                 console.log(`Argument ${val} is not a valid argument`);
//                 break; 
//         }
//     }
// }

//Alternative short-hand
const provinces = {
    on: "Ontario",
    bc: "British Columbia",
    ab: "Alberta",
};
let idx, val;
for([idx,val] of process.argv.entries()){
    if(idx > 1 && idx < process.argv.length){
        provinces[val]
            ? console.log(`We've entered an argument for ${provinces[val]}`)
            : console.log(`Argument ${val} is not a valid argument`)
    }
}