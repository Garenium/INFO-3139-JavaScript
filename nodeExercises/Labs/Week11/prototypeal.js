let Animals = {}; // Animal inherits object methods from Object.prototype.
Animals.eat = true; // Animal has an own property - eat ( all Animals eat ).
let Cat = Object.create(Animals); // Cat inherits properties from Animal and Object.prototype.
Cat.sound = true; // Cat has an own property-sound (animals under the cat family make sounds).
let Lion = Object.create(Cat); // Lion (inherits properties from Cat,Animal,and Object.prototype.
Lion.roar = true; // Lion has its own property - roar ( Lions can raw )
console.log(`own property roar - ${Lion.roar}`); // true - This is an "own property".
console.log(`inherited Cat property sound - ${Lion.sound}`); // true - Lion inherits sound from the Cat object.
console.log(`inherited Animal property eat - ${Lion.eat}`); // true - Lion inherits eat from the Animal object.
console.log(`inherited Object property toString - ${Lion.toString()}`); // "[object Object]"-Lion inherits toString from Object.prototype.
