/**
 * Print out js as valid html
 *
*/

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
   constructor(html, head, body, data) {
     this.#staticTags.body = bodyTags;
     this.#staticTags.head = headTags;
     this.#attributes = attributes;
     this.#data = data;
     this.#page = this.#convert(html, head, body);
   }
 
   // setup siblings, data, and container data parse
   #convert(html, head, body) {
     let page = "";
     page += `<!DOCTYPE>`;
     page += `<html${this.#processAttribute(html)}>`;
     this.#currentTags = this.#staticTags.head;
     page += this.#process("head", head);
     this.#currentTags = this.#staticTags.body;
     page += this.#process("body", body);
     page += "</html>";
     return page;
   }
 
   // Proces a tag recursively
   #process(containerTag, elementHierarchy) {
     this.#depth ++;
     let returnHtml = this.#currentTags[containerTag]?.open;
     if (["html", "head", "body"].includes(containerTag)) {
       returnHtml += ">";
     }
     this.#tags.push(containerTag);
 
     if(this.#depthOfData == this.#depth-1){
       this.#dataExpand = this.#data.shift();
     }
 
     // recursion
     if (!elementHierarchy) {
       // no data, skip processing
     } else if (Array.isArray(elementHierarchy)) {
       elementHierarchy.forEach((element) => {
         Object.entries(element).forEach(([key,value])=>{
           returnHtml += this.#process(key,value);
         })
       });
     } else if (typeof elementHierarchy == "object") {
       elementHierarchy = this.#expandObject(containerTag,elementHierarchy);
       if (!elementHierarchy["attributes"]) {
         returnHtml += ">";
       }
       if(!Array.isArray(elementHierarchy))
         elementHierarchy = [elementHierarchy];
       elementHierarchy.forEach(element=>{
         returnHtml += this.#processObject(element);
       })
     }
     returnHtml += this.#closeTags();
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
         expandedObject.push(JSON.parse(`{"${containerTag}": ${JSON.stringify(object)}}`));
       }
     } else if (typeof expandPremise == "string") {
       for (var i of this.#data) {
         expandedObject.push(JSON.parse(`{"${containerTag}": ${JSON.stringify(object)}}`));
       }
     }
     this.#depthOfData = this.#depth;
     return expandedObject;
   }
 
   #processObject(valueAsObject) {
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
         returnHtml += this.#processAttribute(jsValue);
         returnHtml += ">";
         break;
       case "children":
         Array.from(jsValue).forEach((element) => {
           Object.entries(element).forEach(([elKey,elVal])=>{
             returnHtml += this.#process(elKey,elVal);
           })
         });
         break;
       case "data":
         returnHtml += this.#processData(jsValue);
         break;
       default:
         returnHtml += this.#process(jsKey, jsValue);
         break;
     }
     return returnHtml;
   }
 
   #closeTags() {
     let closeTag = this.#tags.pop();
     let returnHtml = "";
     returnHtml += this.#currentTags?.[closeTag]?.close?this.#currentTags[closeTag].close:"";
     this.#depth --;
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
         if(e)
           htmlString+=`${data?.[e]?data[e]:""}`;
       });
     }
     else{
       htmlString += dataReferences;
     }
     return htmlString;
   }
 
   #processAttribute(attributes) {
     let htmlString = "";
     Object.entries(attributes).forEach(([key, value]) => {
       if (Array.isArray(value)) {
         value.forEach((element) => {
           htmlString += this.#processAttribute(element);
         });
       }
       if (
         this.#attributes?.[key]?.global ||
         (this.#attributes?.[key] &&
           Array.from(this.#attributes?.[key]?.tags).filter((attributeTag) => {
             return attributeTag.match(this.#currentTags);
           }))
       ) {
         htmlString += ` ${key}="${this.#processData(value)}"`;
       }
     });
     return htmlString;
   }
 
   getPage() {
     return this.#page;
   }
 }
 