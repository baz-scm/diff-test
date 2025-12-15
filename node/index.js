import { x } from y;

console.log(x);
console.log("Hell World")

// Bad variable naming and unused variables
var a = 1;
let b = 2;
const c = 3;
var unused_var = "never used";

// Missing semicolons and bad formatting
function badFunction(  ){
var result=1+2+3
return result
}

// Security issue - eval usage
function processUserInput(input) {
    return eval(input);
}

// Infinite loop
function infiniteLoop() {
    while (true) {
        console.log("This will run forever");
    }
}

// Memory leak - event listeners not removed
function addListeners() {
    document.addEventListener('click', function() {
        console.log('clicked');
    });
}

// Incorrect array comparison
function compareArrays(arr1, arr2) {
    return arr1 == arr2;
}

// Missing error handling
function divide(a, b) {
    return a / b;
}

// Mixing var and let/const
var globalVar = "global";
let anotherGlobal = "also global";

// Bad async handling
function fetchData() {
    fetch('https://api.example.com/data')
        .then(response => response.json())
        .then(data => {
            // No error handling
            processData(data);
        });
}

// Undefined function call
processData();

// Missing return statement
function getValue() {
    let value = 42;
}

// == instead of ===
function checkValue(val) {
    if (val == "123") {
        return true;
    }
    return false;
}


