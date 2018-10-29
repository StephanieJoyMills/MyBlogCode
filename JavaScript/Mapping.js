
kitties_arr = [
    "tiger", "lion", "maine coon"
] 
let kitties = kitties_arr.map((cat) => {
    let dog = "new" + cat;
    return dog;
});
console.log(kitties);

let kittiesV2 = kitties_arr.map((cat) => 
    "new" + cat
);
console.log(kittiesV2);