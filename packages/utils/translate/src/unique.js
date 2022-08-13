export class Unique {

  #uniqueSet;

  /**
   *
   * @param {Array} arrayToCheck
   */
  constructor(arrayToCheck) {
    this.stringArray = this.#getStringArray(arrayToCheck);
    this.unique = [... new Set(this.stringArray)];
    this.#uniqueSet = new Set(this.stringArray);
    this.duplicateEntries = this.#getDuplicates(this.stringArray, this.#uniqueSet);
    this.containsDuplicates = this.duplicateEntries?.length ? true : false;
  }

  /**
   *
   * @param {Array} array
   */
  #getStringArray(array) {
    let stringArray = [];
    array.forEach((element) => {
      stringArray.push(JSON.stringify(element));
    });
    return stringArray;
  }

  /**
   * Get duplicated elemetns
   * @param {Array} array
   * @param {Set} unique
   */
  #getDuplicates(array, unique) {
    var duplicateEntries = new Set();
    array.forEach((element) => {
      if (unique.has(element)) {
        unique.delete(element);
      } else {
        duplicateEntries.add(element);
      }
    });
    return [...duplicateEntries];
  }
}
