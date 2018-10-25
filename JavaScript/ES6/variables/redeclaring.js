function redeclaringVar() {
  var res = "important data!";
  var res = "whoops";
  console.log(res); // whoops
}

function redeclaringLet() {
  let res = "important data!";
  let res = "NOPE!"; // SyntaxError: Identifier 'res' has already been declared
  console.log(res); // important data!
  if (true) {
    let res =
      "Remember! a new scope means we can use the same name without loosing our important data";
    console.log(res); // Remember! a new scope means we can use the same name without loosing our important data
  }
  console.log(res); // important data!
}

redeclaringVar();
redeclaringLet();
