function introToScope() {
  // Initialize a global (outermost) variable
  global.globalScope = "outside";
  let level = "1";
  console.log(`We start on level ${level}`); // We start on level 1
  if (level) {
    // Enter new block
    let level = "2";
    console.log(
      `We are now on level ${level} but we can still see ${globalScope}`
    ); // We are now on level 2 but we can still see outside
    if (level) {
      // Enter nested block
      let level = "3";
      console.log(
        `We are on level ${level} but we can still see ${globalScope}`
      ); // We are on level 3 but we can still see outside
    }
    console.log(`We are back on level ${level}`); // We are back on level 2
  }
  console.log(`We are back on level ${level}`); // We are back on level 1
}

function theoreticalDynamicScoping() {
  function calledSecond() {
    console.log(declareMe); //dynamic!
  }
  function calledFirst() {
    let declareMe = "declared!";
    calledSecond();
  }
  // calledFirst(); Would trigger `ReferenceError: declareMe is not defined`
}

function playingWithGlobalObj() {
  global.globalVar = "Access me anywhere!";
  console.log(globalVar); // Access me anywhere!
  globalString = "Change me anywhere!";
  console.log(globalString); // Change me anywhere!
}

function blockScope() {
  let blockScope = "initial";
  var functionScope = "initial";
  if (true) {
    let blockScope = "new";
    var functionScope = "new";
    console.log(`We see the ${blockScope} value`); // new
    console.log(`We see the ${functionScope} value`); // new
  }
  console.log(`We now see the ${blockScope} value`); // old
  console.log(
    `We still see the ${functionScope} value b/c it did not create a new variable`
  ); // new
}

function functionScope() {
  let blockScope = "initial";
  var functionScope = "initial";
  function newFunctionScope() {
    let blockScope = "new";
    var functionScope = "new";
    console.log(`We see the ${blockScope} value`); // new
    console.log(`We see the ${functionScope} value`); // new
  }
  newFunctionScope();
  console.log(`We now see the ${blockScope} value`); // old
  console.log(`We now see the ${functionScope} value`); // old
}
introToScope();
