exports.functionOutput = funcArr => {
  funcArr.forEach(function(func, index) {
    const num = String(func.name).length + String(index).length;
    console.log(
      `Function ${index + 1}: ${func.name}() \n--------------${"-".repeat(num)}`
    );
    func();
    console.log(`\n`);
  });
};
