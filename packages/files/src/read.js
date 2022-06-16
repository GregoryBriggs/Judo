import process from "node:process";

export class Read {
  constructor(_options) {
    this.fs = require("fs");
    this._ = (fileNameAndDirectory, content, charset = "utf-8") => {
      this.#readFile(fileNameAndDirectory, content, charset);
    };
  }

  #readFile(fileNameAndDirectory, content, _options) {
    if (typeof fileNameAndDirectory != "string") {
      console.error();
      process.exitCode = 1;
    }
    var formattedContent = this.#convertContent(
      content,
      fileNameAndDirectory,
      format
    );
  }
}
