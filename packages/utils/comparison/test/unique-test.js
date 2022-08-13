import { Unique } from "../src/unique.js";

let obA = {a: "hello"};
let obB = {b: "world"};
let duplicateArray = [obA, obA, obA];
let uniqueArray = [obA, obB];
let randomArray = Array.from(Array(10000000).keys());

let expectDuplicateDetected = new Unique(duplicateArray);
let expectEmptyDuplicate = new Unique(uniqueArray);
let largeArray = new Unique(randomArray);

console.log(expectDuplicateDetected.duplicateEntries[0] == JSON.stringify(obA));
console.log(expectDuplicateDetected.duplicateEntries.length == 1);
console.log(expectDuplicateDetected.containsDuplicates);
console.log(expectEmptyDuplicate.duplicateEntries.length == 0);
console.log(!expectEmptyDuplicate.containsDuplicates);
console.log(expectEmptyDuplicate.unique.length == uniqueArray.length);