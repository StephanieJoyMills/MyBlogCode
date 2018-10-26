function hoistingWithVar() {
  console.log(declaredBelow); // undefined
  var declaredBelow;
  console.log(declaredBelow); // undefined
}
function notHoistingWithLet() {
  console.log(declaredBelow); // ReferenceError: declaredBelow is not defined
  let declaredBelow;
  console.log(declaredBelow); // undefined
}

// So how is javascript  reading this?
function weWrite() {
  console.log(declaredBelow); // undefined
  var declaredBelow = "initialized!";
}

function jsReads() {
  var declaredBelow;
  console.log(declaredBelow); // undefined
  declaredBelow = "initialized!";
}

function unexpectedBehaviour() {
  var badVar = "we want to see this";
  function weirdBehaviour() {
    if (false) {
      var badVar = "this should not affect the outcome of our code";
    }
    console.log(badVar); // undefined
  }
  weirdBehaviour();
}

function expectedUnexpectedBehaviour() {
  var badVar = "we want to see this";
  function weirdBehaviour() {
    var badVar;
    if (false) {
      badVar = "this should not affect the outcome of our code";
    }
    console.log(badVar); // undefined
  }
  weirdBehaviour();
}

function fixingUnexpectedBahviour() {
  let goodVar = "we want to see this";
  function goodBehaviour() {
    if (false) {
      let goodVar = "this should not affect the outcome of our code";
    }
    console.log(goodVar); // we want to see this"
  }
  goodBehaviour();
}

function forWithVar() {
  const varArrLogs = [];
  for (var i = 0; i < 3; i++) {
    varArrLogs.push(() => {
      process.stdout.write(` ${i} `);
    });
  }
  for (const log of varArrLogs) {
    log(); //  3  3  3
  }
  console.log();
}

function forWithLet() {
  const letArrLogs = [];
  for (let i = 0; i < 3; i++) {
    letArrLogs.push(() => {
      process.stdout.write(` ${i} `);
    });
  }
  for (const log of letArrLogs) {
    log(); // 0  1  2
  }
  console.log();
}

// hoistingWithVar();
// notHoistingWithLet();
// weWrite();
// jsReads();
// unexpectedBehaviour();
// expectedUnexpectedBehaviour();
// fixingUnexpectedBahviour();
forWithVar();
forWithLet();
