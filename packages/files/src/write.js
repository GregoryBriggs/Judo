import process from "node:process";

/**
 * @class Write
 * @description Write files to disk
 * @param {Object} options
 * @param {String} options.fileNameAndDirectory
 * @param {String} options.content
 * @param {String} options.charset
 */
export default class Write {
  #fs;
  array = "array";
  object = "object";

  constructor(options) {
    this._ = (options) => {
      this.#writeFile(options.fileNameAndDirectory, options.content, options.options, this.#fs);
    };
    this._ = (fileNameAndDirectory, content, options = {charset:"utf-8"}) => {
      this.#writeFile(fileNameAndDirectory, content, options, this.#fs);
    };
    import("node:fs").then((fs) => {
      this.#fs = fs;
      if (options) {
        this._(
          options.fileNameAndDirectory,
          options.content,
          options.charset,
          fs
        );
      }
    });
  }

  #writeFile(fileNameAndDirectory, content, options, fs) {
    if (typeof fileNameAndDirectory != "string") {
      console.error();
      process.exitCode = 1;
    }
    if(!fs)
      return;
    this.#createFileAndDirectory(fileNameAndDirectory, fs);
    fs.writeFile(
      fileNameAndDirectory,
      this.#convertContent(content, fileNameAndDirectory, options),
      options?.encoding,
      (err) => {
        if (err) {
          console.error(err);
          process.exitCode = 1;
        }
      }
    );
  }

  #createFileAndDirectory(fileNameAndDirectory, fs) {
    const fileName = fileNameAndDirectory.split("/").pop();
    const directory = fileNameAndDirectory.split("/").slice(0, -1).join("/");
    fs.mkdir(directory, { recursive: true }, (err) => {
      if (err) {
        throw err;
      }
    });
  }

  #convertContent(content, fileAndDirectory, options) {
    var mime = fileAndDirectory.split(".").pop();
    switch (mime) {
      case "csv":
        return this.#csv(content, options);
      case "json":
        return this.#json(content, options?.replacer, options?.options);
      case "js":
        return this.#js(content);
      case "xml":
        return this.#xml(content);
      case "txt":
        return this.#txt(content, options);
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

  #yaml(content) {
    return YAML.stringify(content);
  }

  #js(content) {
    return `${content}`;
  }

  /**
   *
   * @param {Array} content
   */
  #json(content, replacer, options) {
    try{
      return JSON.stringify(JSON.parse(content, replacer, options));
    }
    catch(e){
      return JSON.stringify(content);
    }
  }

  /**
   *
   * @param {Array} content
   */
  #csv(content) {
    return this.#txt(content, { delimiter: '","' });
  }

  #xml(content) {
    return `<?xml version="1.0" encoding="UTF-8"?>\n${content}`;
  }

  #docx(content) {
    return this.#xml(content);
  }

  #pdf(content) {
    return this.#txt(content);
  }
  #xls(content) {
    return this.#txt(content);
  }
  #xlsx(content) {
    return this.#txt(content);
  }
  #avi(content) {
    return this.#txt(content);
  }

  #aac(content) {
    return this.#txt(content);
  }

  #bmp(content) {
    return this.#txt(content);
  }

  #css(content) {
    return this.#txt(content);
  }

  #flac(content) {
    return this.#txt(content);
  }

  #flv(content) {
    return this.#txt(content);
  }

  #gif(content) {
    return this.#txt(content);
  }

  #html(content) {
    return this.#txt(content);
  }

  #ico(content) {
    return this.#txt(content);
  }

  #jpg(content) {
    return this.#txt(content);
  }

  #jpeg(content) {
    return this.#txt(content);
  }

  #less(content) {
    return this.#txt(content);
  }

  #md(content) {
    return this.#txt(content);
  }

  #mp3(content) {
    return this.#txt(content);
  }

  #mp4(content) {
    return this.#txt(content);
  }

  #mpg(content) {
    return this.#txt(content);
  }

  #mpeg(content) {
    return this.#txt(content);
  }

  #mov(content) {
    return this.#txt(content);
  }

  #ogg(content) {
    return this.#txt(content);
  }

  #ogv(content) {
    return this.#txt(content);
  }

  #png(content) {
    return this.#txt(content);
  }

  #scss(content) {
    return this.#txt(content);
  }

  #sass(content) {
    return this.#txt(content);
  }

  #styl(content) {
    return this.#txt(content);
  }

  #stylus(content) {
    return this.#txt(content);
  }

  #svg(content) {
    return this.#txt(content);
  }

  #swf(content) {
    return this.#txt(content);
  }

  #tiff(content) {
    return this.#txt(content);
  }

  #tif(content) {
    return this.#txt(content);
  }

  #wav(content) {
    return this.#txt(content);
  }

  #webp(content) {
    return this.#txt(content);
  }

  #webm(content) {
    return this.#txt(content);
  }

  #wma(content) {
    return this.#txt(content);
  }

  #wmv(content) {
    return this.#txt(content);
  }

  /**
   *
   * @param {Array} content
   */
  #txt(content, options) {
    var formattedContent = [];
    formattedContent.push(
      `${options?.delimiter?.match(/"/g) ? '"' : ""}${Object.keys(
        content[0]
      ).join(`${options?.delimiter ? options.delimiter : ","}`)}${
        options?.delimiter?.match(/"/g) ? '"' : ""
      }\n`
    );
    if (!content || ![this.array, this.object].includes(typeof content))
      return content;
    Object.values(content).forEach((row) => {
      formattedContent.push(
        `${row.join(
          `${options?.delimiter?.match(/"/g) ? '"' : ""}${
            options?.delimiter ? options.delimiter : ""
          }`
        )}${options?.delimiter?.match(/"/g) ? '"' : ""}\n`
      );
    });
    return formattedContent;
  }
}
