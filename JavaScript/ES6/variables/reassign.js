const { functionOutput } = require("../../Helpers/formatFunctionOutput.js");

function declaringAConst() {
  // const bad; // Uncaught SyntaxError: Missing initializer in const declaration
  const good = "no errors here!";
  // good = "error here.."; // TypeError: Assignment to constant variable.
  console.log("no output");
}

function constantNotConstant() {
  const myObj = {};
  myObj.prop = 123;
  console.log(myObj.prop); // 123
  // myObj = { possible: "Nope!" }; // TypeError - we can't change our inital  pointer
  // If we want to make a prop we can freeze it!
  const obj = Object.freeze({ innerObj: {} });
  obj.prop = 123; // Now we can't change the object's properties
  // ... buttttt
  obj.innerObj.prop = "evil laugh"; // We CAN change the object's property's properties
  console.log(obj);
}

function constantArr() {
  const arr = ["you", "can", "change", "me"];
  arr[1] = "did";
  arr.push(":D");
  console.log(arr); // [ 'you', 'did', 'change', 'me', ':D' ]
}

const funcArr = [declaringAConst, constantNotConstant, constantArr];
functionOutput(funcArr);
