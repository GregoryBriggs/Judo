# Judo-Utils-Unique

Utility to check if array is unique and returns a list of duplicate values

## Install

```
npm install judo-utils-unique v0.0.1
```

## Usage

```
import Unique from 'judo-utils-unique';

...
// variable containing json data
var myArray = fs.readFile('someJsonFile.json');
...

var duplicatedEntries = new Unique(myArray);
// check if array contains duplicates
console.log(duplicatedEntries.containsDuplicates);
// get duplicate entries
console.log(duplicatedEntries.duplicateEntries);
// get unique set of entries
console.log(duplicatedEntries.unique);
```

## Limits

Currently, tests in ./test/unique-tests.js evaluate a 10,000,000 entry array in around 6.339 seconds. This is approximately an O(N) operation due to the array evaluation. If it is desireable to split out the O(1) boolean eval, please reach out. Enjoy!