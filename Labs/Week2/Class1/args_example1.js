//loop through command line arguments in process.argv array
let idx, val;
for([idx,val] of process.argv.entries()){
    console.log(`index is ${idx} : value is ${val}`)
}