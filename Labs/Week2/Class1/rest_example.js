//sample function using REST operator...

const calculateTotalCost = (id, name, ...costs) => {
    let totalCost = 0.0;
    //if no costs come in then we will get an empty an array
    costs.forEach((amount) => (totalCost += amount));
    //send the JSON back including the newly calculated total
    return {
        productId: id,
        productName: name,
        totalCost: totalCost,
    };
};

//define any number of costs related to a product
let mfgCost = 100.0;
let shipping = 12.99;
let taxes = 5.43;
let insurance = 3.22;

//call the function and pass all the variables
let productInfo = calculateTotalCost(
    1001,
    "Widget",
    mfgCost,
    shipping,
    taxes,
    insurance
);

let fmtCost = productInfo.totalCost.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
});

console.log(
    `product ${productInfo.productId} a ${productInfo.productName} has a total cost of ${fmtCost}`   
);