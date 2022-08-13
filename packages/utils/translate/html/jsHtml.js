/**
 * Print out js as valid html
 *
 * Goal: css - agnostic
 *
 * Notes:
 * only shallow data assignment valid at this point
 * Runs through order of data array
 */

import htmlTags from "./htmlTags.json" assert { type: "json" };
import bodyTags from "./bodyTags.json" assert { type: "json" };
import headTags from "./headTags.json" assert { type: "json" };
import attributes from "./attributes.json" assert { type: "json" };

export class JsHtml {
  #page;
  #tags = [];
  #data = [];
  #currentTags = {};
  #attributes = {};
  #staticTags = {};
  #depth = 0;
  #depthOfData = -1;
  #dataExpand = {};

  /**
   *
   * @param {*} html
   * @param {Array} head
   * @param {Array} body
   * @param {Array} data
   */
  constructor(html, data) {
    this.#staticTags.html = htmlTags;
    this.#staticTags.body = bodyTags;
    this.#staticTags.head = headTags;
    this.#attributes = attributes;
    this.#data = data;
    this.#page = this.#process(html);
  }

  // Proces a tag recursively
  // add container tag to list of tags - must have a tag
  // recursively:
  //    1. add attributes of tag (value) - if applicable
  //    2. add data to tag - if applicable
  //    3. process any child elements - if applicable
  // pop list of tags - must close off tag
  // return html
  process(containerTag, elementHierarchy) {
    let returnHtml = this.#processContainerTag(containerTag);
    if(returnHtml){return returnHtml;}
    this.#depth++;
    returnHtml = this.#currentTags[containerTag]?.open;
    console.log(`#process->containerTag: ${containerTag}`);
    console.log(
      `#process->elementHierarchy: ${JSON.stringify(elementHierarchy)}`
    );
    this.#tags.push(containerTag);

    // expand element array based on data object
    if (this.#depthOfData == this.#depth - 1) {
      this.#dataExpand = this.#data.shift();
    }

    // evaluate remaining objects
    if (!elementHierarchy) {
      // no data, skip processing
    } else if (Array.isArray(elementHierarchy)) {
      // element hierarchy has sibling elements now. process each one at this juncture
      // by recursively calling this process
      console.log(`#process->isArray ${JSON.stringify(elementHierarchy)}`);
      elementHierarchy.forEach((element) => {
        Object.entries(element).forEach(([key, value]) => {
          returnHtml += this.#process(key, value);
        });
      });
    } else if (typeof elementHierarchy == "object") {
      // element hierarch is an object
      // process the object to get all attributes by
      // 1. Checking if the object needs to be expanded
      // 2. Checking the attributes for closing tag
      // 3. Converting to an array for further processing
      // 4. Further process the object which may recrusively call this function
      elementHierarchy = this.#expandObject(containerTag, elementHierarchy);
      if (!elementHierarchy["attributes"]) {
        returnHtml += ">";
      }
      if (!Array.isArray(elementHierarchy))
        elementHierarchy = [elementHierarchy];
      console.log(`#process->processing object`);
      elementHierarchy.forEach((element) => {
        returnHtml += this.#processObject(element);
      });
    }
    returnHtml += this.#closeTags();
    console.log(`#process->returnHtml${returnHtml}`);
    return returnHtml;
  }

  #processContainerTag(containerTag) {
    let returnHtml = "";
    if (!containerTag) {
      throw new Error(`missing container tag`);
    }
    if (typeof containerTag === "object") {
      Object.entries(containerTag).forEach(([tag, elementInHierarch]) => {
        console.log(`#processContainerTag->containerTag: ${JSON.stringify(containerTag)}`);
        returnHtml += this.#process(tag, elementInHierarch);
      });
    } else if (containerTag === "html") {
      this.#currentTags = this.#staticTags.html;
    } else if (containerTag === "head") {
      this.#currentTags = this.#staticTags.head;
    } else if (containerTag === "body") {
      this.#currentTags = this.#staticTags.body;
    }
    return returnHtml;
  }

  #expandObject(containerTag, object) {
    if (!object?.expand) {
      return object;
    }
    let expandedObject = [];
    let expandPremise = object.expand;
    delete object.expand;

    if (typeof expandPremise == "number") {
      for (let index = 0; index < object.expand; index++) {
        expandedObject.push(
          JSON.parse(`{"${containerTag}": ${JSON.stringify(object)}}`)
        );
      }
    } else if (typeof expandPremise == "string") {
      console.log(`#expandObject->object ${JSON.stringify(object)}`);
      console.log(`#expandObject->this.#data ${JSON.stringify(this.#data)}`);
      console.log(
        `#expandObject->containerTag ${JSON.stringify(containerTag)}`
      );
      for (var i of this.#data) {
        expandedObject.push(
          JSON.parse(`{"${containerTag}": ${JSON.stringify(object)}}`)
        );
      }
    }
    this.#depthOfData = this.#depth;
    console.log(`#expandObject->expandedObject ${expandedObject}`);
    return expandedObject;
  }

  #processObject(valueAsObject) {
    console.log(
      `#processObject->valueAsObject: ${JSON.stringify(valueAsObject)}`
    );
    let returnHtml = "";
    Object.entries(valueAsObject).forEach(([key, value]) => {
      returnHtml += this.#supportedKeys(key, value);
    });
    return returnHtml;
  }

  /**
   *
   * @param {string} jsKey - key to process - could be html tag or supported attribute, children, or data
   * @param {*} jsValue - can be any data type.
   * @returns string - valid html
   */
  #supportedKeys(jsKey, jsValue) {
    let returnHtml = "";
    switch (jsKey) {
      case "attributes":
        console.log(`#supportedKeys->attributes`);
        returnHtml += this.#processAttribute(jsValue);
        returnHtml += ">";
        break;
      case "children":
        console.log(`#supportedKeys->children`);
        Array.from(jsValue).forEach((element) => {
          Object.entries(element).forEach(([elKey, elVal]) => {
            returnHtml += this.#process(elKey, elVal);
          });
        });
        break;
      case "data":
        console.log(`#supportedKeys->data`);
        returnHtml += this.#processData(jsValue);
        break;
      default:
        console.log(
          `#supportedKeys->default - processing key: ${jsKey} | value: ${jsValue}`
        );
        returnHtml += this.#process(jsKey, jsValue);
        break;
    }
    return returnHtml;
  }

  #closeTags() {
    let closeTag = this.#tags.pop();
    console.log(`popping tags. Remaining: ${JSON.stringify(this.#tags)}`);
    console.log(`popping tags. popped tag: ${closeTag}`);
    let returnHtml = "";
    returnHtml += this.#currentTags?.[closeTag]?.close
      ? this.#currentTags[closeTag].close
      : "";
    this.#depth--;
    return returnHtml;
  }

  /**
   * take data and add it to the current context.
   *
   * @param {*} availableData
   * @param {*} dataReferences
   */
  #processData(dataReferences) {
    let htmlString = "";
    let data = this.#dataExpand;
    if (dataReferences.match(/\{\{.*\}\}/)) {
      dataReferences.split(/{{/).forEach((element) => {
        let e = element.split(/}}/)[0].trim();
        console.log(`#processData->data: ${data}`);
        console.log(`#processData->element: ${element}`);
        console.log(`#processData->e: ${e}`);
        if (e) htmlString += `${data?.[e] ? data[e] : ""}`;
        console.log(`#processData->htmlString: ${htmlString}`);
      });
    } else {
      htmlString += dataReferences;
    }
    console.log(`#processData->htmlString: ${htmlString}`);
    return htmlString;
  }

  #processAttribute(attributes) {
    let htmlString = "";
    console.log(`processElementObject->element: ${JSON.stringify(attributes)}`);
    Object.entries(attributes).forEach(([key, value]) => {
      console.log(
        `processElementObject->processing object. key: ${key}. value ${JSON.stringify(
          value
        )}`
      );
      if (Array.isArray(value)) {
        console.log(
          `processElementObject->processing array since value is an array.`
        );
        value.forEach((element) => {
          htmlString += this.#processAttribute(element);
        });
      }
      console.log(
        `processElementObject->this.#attributes[key]: ${this.#attributes[key]}`
      );
      if (
        this.#attributes?.[key]?.global ||
        (this.#attributes?.[key] &&
          Array.from(this.#attributes?.[key]?.tags).filter((attributeTag) => {
            return attributeTag?.match(this.#currentTags);
          }))
      ) {
        htmlString += ` ${key}="${this.#processData(value)}"`;
      }
    });
    console.log(`processElementObject->htmlString: ${htmlString}. Returning`);
    return htmlString;
  }

  getPage() {
    return this.#page;
  }
}
