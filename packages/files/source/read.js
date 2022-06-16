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

  #convertContent(content, mime, _format) {
    switch (mime) {
      case "csv":
        return this.#csv(content);
      case "json":
        return this.#json(content);
      case "js":
        return this.#js(content);
      case "xml":
        return this.#xml(content);
      case "txt":
        return this.#txt(content);
      case "yaml":
        return this.#yaml(content);
      case "yml":
        return this.#yaml(content);
      case "docx":
        return this.#docx(content);
      case "pdf":
        return this.#pdf(content);
      case "xlsx":
        return this.#xlsx(content);
      case "xls":
        return this.#xls(content);
      case "avi":
        return this.#avi(content);
      case "aac":
        return this.#aac(content);
      case "bmp":
        return this.#bmp(content);
      case "css":
        return this.#css(content);
      case "flac":
        return this.#flac(content);
      case "flv":
        return this.#flv(content);
      case "gif":
        return this.#gif(content);
      case "html":
        return this.#html(content);
      case "ico":
        return this.#ico(content);
      case "jpg":
        return this.#jpg(content);
      case "jpeg":
        return this.#jpeg(content);
      case "less":
        return this.#less(content);
      case "md":
        return this.#md(content);
      case "mp3":
        return this.#mp3(content);
      case "mp4":
        return this.#mp4(content);
      case "mpg":
        return this.#mpg(content);
      case "mpeg":
        return this.#mpeg(content);
      case "mov":
        return this.#mov(content);
      case "ogg":
        return this.#ogg(content);
      case "ogv":
        return this.#ogv(content);
      case "png":
        return this.#png(content);
      case "scss":
        return this.#scss(content);
      case "sass":
        return this.#sass(content);
      case "styl":
        return this.#styl(content);
      case "stylus":
        return this.#stylus(content);
      case "svg":
        return this.#svg(content);
      case "swf":
        return this.#swf(content);
      case "tiff":
        return this.#tiff(content);
      case "tif":
        return this.#tif(content);
      case "wav":
        return this.#wav(content);
      case "webp":
        return this.#webp(content);
      case "webm":
        return this.#webm(content);
      case "wma":
        return this.#wma(content);
      case "wmv":
        return this.#wmv(content);
      default:
        return this.#txt(content);
    }
  }
}
