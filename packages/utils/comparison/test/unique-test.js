import { Unique } from "../src/unique.js";

let obA = {a: "hello"};
let obB = {b: "world"};
let duplicateArray = [obA, obA]
let uniqueArray = [obA, obB]

let expectDuplicateDetected = new Unique(duplicateArray);
let expectEmptyDuplicate = new Unique(uniqueArray);

console.log(expectDuplicateDetected.duplicateEntries[0] == JSON.stringify(obA));
console.log(expectDuplicateDetected.duplicateEntries.length == 1);
console.log(expectEmptyDuplicate.duplicateEntries.length == 0);