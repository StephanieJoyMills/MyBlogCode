# Variation of Variables

##### Getting Started

With the introduction of ES6’s const and let, the generally accepted “rules” to follow for Javascript variables are as follows:

- Use const whenever you can
- Use let when you can’t use const
- Ne-var

Throughout this post we will explore javascript variables in-depth and gain a deeper understanding of the similarities and differences between them, focusing on understanding the following table:

| Variable |  Scope   | Hoisting | Reassigned | Redeclared |
| :------: | :------: | :------: | :--------: | :--------: |
|   var    | Function |   Yes    |    Yes     |    Yes     |
|   let    |  Block   |    No    |    Yes     |     No     |
|  const   |  Block   |    No    |     No     |     No     |

##### Road Map

0. Javascript Variable Storage (Heap vs Stack)
1. Scope
1. Hoisting
1. Reassignment
1. Redeclaration
1. Life Cycles

#### Part 0: Understanding Javascript Variable Storage

Before we jump into understanding the different type of variables, let do a quick recap on how Javascript is actually storing them!

- ECMAScript uses the internal data structure _environment_ to store variables by mapping names to values.
- An environment will sometimes need to live on after it's scope, therefore variables are allocated on the heap.(\*We'll come back to scope later - for now we'll focus our attention on the fact that we need our environment to **not** be temporary - and how this relates to "heap" storage)

We have to options when it comes to storage, _"Stack"_ and _"Heap"_:

1. Stack:

- A stack is a space in your computer's memory that stores temporary variables
- It uses a "LIFO" (Last in first out) data structure
- This means every time we declare a variables within a function it gets pushes on top of the stack. When we leave the function, _all_ variables declared within it are popped off the top of the stack freeing up the memory they were consuming.
- _Advantage_:
  - Our CPU is highly optimized for this form of storage and as a result is very fast at processing stacks.
- _Disadvantage_:
  - there is a limit to the size of variables that can be stored on the stack
  - variables created on the stack are **temporary** and cannot be accessed after they are popped off

2. Heap:

- A Larger region of memory which stores everything dynamically in an unordered fashion.
- Advantage:
  - No size restrictions on variables size (aside from you actual computer)
  - Variables created on the heap are accessible by any function, anywhere in your program.(**not temporary**)
- Disadvantage:
  - Slightly slower to read/write as it uses pointers to access memory on the heap

So going back to our earlier point, "An environment will sometimes need to live on after it's scope, therefore variables are allocated on the heap", because we don't want our variable storage to be temporary, it makes sense we are using the heap.

Now to the good stuff!

#### Part 1: Scope

Before we try to understand what a block/function scope is, there's a few key terms/concepts we have to understand first.

To start, what is a scope?

A scope refers to the _region of visibility of variables_. In other words, when we create a variable, the scope is the parts of your program that can see/use it.

There are 2 categories of variables scopes

1. Lexical (or Static) Scopes
   Based on the program as it exists in source code, without running it.

2. Dynamic Scopes
   Based on what happens while executing the program (“at runtime”).

```
// Theoretical dynamic scoping
function calledSecond() {
  console.log(declareMe); //dynamic!
}
function calledFirst() {
  var declareMe = "declared!";
  calledSecond();
}
calledFirst();
```

Variables in JavaScript are lexically scoped - they refer to their nearest lexical environment, so the static structure of a program determines the scope of a variable. In other words it doesn't care where a function is called from!

In this static scope a chain of environments is created. A function will record the scope it was created in via the internal property [[scope]]. When a function is called, an environment is created representing that new scope. That environment has a field called outer that point to the outer scope environment thereby changing environments all the way back to the global environment which has it's outer env property set to null.

To resolve an identifier, this full environment chain is traversed from the current environment to the global environment.

Let's take a look at an example:

```
// Initialize a global (outermost) variable*
global.outerScope = "outside";
let level = "1";
console.log(`We start on level ${level}`); // We start on level 1
if (level) {
  // Enter new block
  let level = "2"; // shadowing**
  console.log(
    `We are now on level ${level} but we can still see ${outerScope}`
  ); // We are now on level 2 but we can still see outside
  if (level) {
    // Enter nested*** block
    let level = "3";
    console.log(`We are on level ${level} but we can still see ${outerScope}`); // We are on level 3 but we can still see outside
  }
  console.log(`We are back on level ${level}`); // We are back on level 2
}
console.log(`We are back on level ${level}`); // We are back on level 1
```

This function introduces a few key concepts:

1. Global Scope

The _Global Scope_ refers to the top level scope - it is accessible everywhere. In Node.js it is controlled by the global object, while in a browser environment it is controlled by the window object.

We will be focusing on node.js.

The global scope, like any other scope has its own environment. However unlike other scopes, this environment is accessible via an object - the global object! It is through this object we can create, read and change global variables.

```
  global.globalVar = "Access me anywhere!";
  console.log(globalVar); // Access me anywhere!
  globalString = "Change me anywhere!";
  console.log(globalString); // Change me anywhere!
```

Creating a global variable should be done with caution, as there are lots of issues associated with it including:

- global variables exist throughout the lifetime of the application, taking up memory and occupying resources.
- Although not an issue in node.js as it is strictly single-threaded ( and Node process clusters do not have native communication), using global variables can cause concurrency issues. If multiple threads access the same variable and there are no access modifiers or fail safes in place, it can lead to some serious issues of two threads attempting to access and use the same variable.
- global variables can create implicit coupling between files or variables - thereby preventing good coding practice (modular, readable and reusable) and cause debugging difficulties

The global object is actually considered one of Brendan Eich's "biggest regrets". So with all these issues do we ever actually use global variables?

- The process object! As it contains information about current running node processes it must be available to any file without having to require it. The env variable is actually part of the process object
- Console is also a global instance configured to write to process.stdout and process.stderr!

2. Nested scopes

Recall _chain of environments_. If a scope is nested within another, then the variables of the outer scope are accessible within the inner scope. The opposite is not true.

3. Shadowing

If we declare a variable in a nested scope with the same name as a variable declared one of its surrounding scopes, access to the outer variable is blocked in the inner scope and all scopes nested within it - any changes to the inner variable will not affect the outer variable. Access to the outer variable will resume once the inner scope is left.

Phew.. that was a lot. Thankful with that background the next few terms become very simple!

Now that we understand what a variable _scope_ is, we can take another look at our table which tell us:

- var is _function scoped_
- const & let are _block scoped_

Function scoped means a new local scope is created when we enter a function

Block scoped means a new local scope is created when we enter any block of code (i.e. ifs, loos, or functions)

Let's see this in action

```
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
```

Now let run the same function but with a function instead of an if statement

```
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
```

Notice when we use function, they both act the same! Both create new lexical scopes inside the function. In the first example we used an if code block so only the let variable created a new lexical scope.

#### Part 2: Reassignment

What does it mean when we say reassign?

When we create a variable we first declare it, than initialize it with a value. If we change that value we are assigning it.

Taking a look at our table we know:

- var & let ARE reassignable
- const is a constant..

If we want to declare a const we must initialize it & declare it in the same place. After we do so we can't change it.

```
  const bad; // Uncaught SyntaxError: Missing initializer in const declaration
  const good = "no errors here!";
  good = "error here.."; // TypeError: Assignment to constant variable.
```

This seems very simple - if we declare something constant it can never be changed, right? Not quite! Although const values cannot be reassigned this does not mean they are immutable! We can actually modify the properties of objects declared with const.

In other words, although our pointer stays the same, the value it points to can be changed.

Let try!

```
  const myObj = {};
  myObj.prop = 123;
  console.log(myObj.prop); // 123
  myObj = { possible: "Nope!" }; // TypeError - we can't change our initial  pointer

  // If we want to make a prop we can freeze it!
  const obj = Object.freeze({ innerObj: {} });
  obj.prop = 123; // Now we can't change the object's properties
  // ... buttttt
  obj.innerObj.prop = "evil laugh"; // We CAN change the object's property's properties
  console.log(obj);
```

As you can see, a const object is actual declaring the pointer as a constant, not the value it is pointing to!

In Javascript arrays are objects (though they have a few key features) so this also applies to arrays!

```
  const arr = ["you", "can", "change", "me"];
  arr[1] = "did";
  arr.push(":D");
  console.log(arr); // [ 'you', 'did', 'change', 'me', ':D' ]
```

For those curious, the additional features array's have are:

1. an additional objects called the Array.prototype in their prototype chain which contains "Array" methods (i.e. toString)
2. length property (auto-updates)
3. addition algorithm - runs if we set a new property to an array with a string name that can be converted to an integer number (i.e. '1', '2', '3', etc.)

#### Part 3: Hoisting

So what is hoisting?

Hoisting is when javascript moves **declarations** (not initializations) to the top of their scope

Our table tells us:

- var does hoist
- const & let do not hoist

What does that mean?
var:

```
  console.log(declaredBelow); // undefined
  var declaredBelow;
  console.log(declaredBelow); // undefined
```

let:

```
  console.log(declaredBelow); // ReferenceError: declaredBelow is not defined
  let declaredBelow;
  console.log(declaredBelow); // undefined
```

As we can see let variables will throw an error when we try to use them before they are declared. Var on the other hand will hoist up this declaration to the top of it's scope.

Javascript takes this,

```
  console.log(declaredBelow); // undefined
  var declaredBelow = "initialized!";
```

and reads this!

```
  var declaredBelow;
  console.log(declaredBelow); // undefined
  declaredBelow = "initialized!";
```

This can cause issues by creating unexpected behaviour, for example:

```
  var badVar = "we want to see this";
  function weirdBehaviour() {
    if (false) {
      var badVar = "this should not affect the outcome of our code";
    }
    console.log(badVar); // undefined
  }
  weirdBehaviour();
```

Because we never enter the if block, we would assume we would log "we want to see this", but javaScript hoists up the inner badVar declaration, reading this as:

```
 var badVar = "we want to see this";
 function weirdBehaviour() {
   var badVar;
   if (false) {
     badVar = "this should not affect the outcome of our code";
   }
   console.log(badVar); // undefined
 }
 weirdBehaviour();
```

To fix this weird behaviour we can use let instead or var. Recall let will treat this if block as a lexical scope:

```
  let goodVar = "we want to see this";
 function goodBehaviour() {
   if (false) {
     let goodVar = "this should not affect the outcome of our code";
   }
   console.log(goodVar); // we want to see this"
 }
 goodBehaviour();
```

Let's test our understanding with a more difficult example!

```
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
```

Hopefully, looking at this now we can understand why this logs "3 3 3" instead of "1 2 3". The var i in the for loop is hoisted up to the top of the scope, so when we run the process.stdout.write, it's pulling the same variable.

If we switched to let or const, each iteration of the loop would create a new binding:

```
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
```

With let each iteration of the for loop creates an additional binding. If we used var

#### Part 4: Redeclaring

Redeclaring is, as one would guess, declaring an already existing variable _in the same scope_

Looking at our table again,

- var can be redeclared
- const & let cannot be redeclared

This one's pretty easy to understand and the issues with variables being declarable are pretty obvious.

Take the following situation:

```
  var res = "important data!";
  var res = "whoops";
  console.log(res); // whoops
```

By using let, we avoid accidentally reusing the same variables

```
  let res = "important data!";
  let res = "NOPE!"; // SyntaxError: Identifier 'res' has already been declared
  console.log(res); // important data!
  if (true) {
    let res =
      "Remember! a new scope means we can use the same name without losing our important data";
    console.log(res); // Remember! a new scope means we can use the same name without our important data
  }
  console.log(res); // important data!
```

#### Part 5: Testing our understanding

Now that we understand var, let and const better we can outline their life cycle. Try to think about this first!

Life cycle of a var:

1. We enter a var's scope
2. Declaration is hoisted to the top, and binding is created for it. An initial value of undefined is set.
3. Actual initialization is reached (if there is one) and value is updated

Life cycle of a let:

1. We enter a let's scope
2. Declaration is hoisted to the top, and binding is created for it. BUT the variable remains uninitialized
   ------ Entering TDZ -----
3. Getting or setting uninitialized let throws a ReferenceError
4. Declaration is reached & value is updated to initializing. If no initial value, set to undefined
   ----- Leaving TDZ --------

Const has the same lifecycle as let, but it must have an initial value in step 4

Temporal dead zones don't sounds like very nice places, so why would we ever intentionally design variables to create one? There's actually several reasons!
• Error Catching! Trying to access an undeclared variable is generally a mistake and should involve a warning
• TDZ was actually the best solution to technical issues with const's implementation. Let was designed to mimic the same behaviour for consistency
• Future-proofing for guards: JavaScript may eventually have guards, a mechanism for enforcing at runtime that a variable has the correct value (think runtime type check). If the value of a variable is undefined before its declaration then that value may be in conflict with the guarantee given by its guard.

#### Recap

Scope:

- The region in which we can see/use a variable. Function scoped creates a new scope only when entering a new function, whereas block scoped creates a new scope when ever we enter a new block of code including ifs, loops and functions.

Hoisting:

- Moving the declaration of variables up to the top of their scope, and initializing them to undefined

Reassigned

- Ability to assign a new value to a variable

Redeclared

- Ability to declare variables with the same name, inside the same scope.

Taking one last (I promise) look at our table:
| Keyword | Scope | Hoisting | Reassigned | Redeclared |
|:---:|:---:|:-----------:|:-----------:|:-----------:|
|var|Function|Yes|Yes|Yes|
|let|Block|No|Yes |No|
|const|Block|No|No|No|

I hope it now provides a simple recap of the differences/similarities between var, let and const!
