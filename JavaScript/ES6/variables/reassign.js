function declaringAConst() {
  // const bad; // Uncaught SyntaxError: Missing initializer in const declaration
  const good = "no errors here!";
  // good = "error here..";
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

declaringAConst();
constantNotConstant();
