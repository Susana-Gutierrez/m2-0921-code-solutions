
function ExampleConstructor() {

}

console.log('Prototype of ExampleConstructor: ', ExampleConstructor.prototype);
console.log('typeof prototype of ExampleConstructor: ', typeof ExampleConstructor.prototype)

var examConstructor = new ExampleConstructor ();

console.log('Value of examConstructor: ', examConstructor);

var isInstanceOfExampleConstructor = examConstructor instanceof ExampleConstructor;

console.log('Value of isInstanceOfExampleConstructor: ', isInstanceOfExampleConstructor);
