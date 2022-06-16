import Write from '../src/write.js'

let optons = {
    fileNameAndDirectory: "./test/test.txt",
    content: "Hello World",
    charset: "utf-8"
};

try {
    const write = new Write( optons);
}catch(err){
    console.log(err);
}

try {
    const write = new Write();
    write._(optons.fileNameAndDirectory, optons.content, optons.charset);
}catch(err){
    console.log(err);
}