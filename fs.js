


// fetch("C:\Users\jbt\Desktop\newFile.txt")
//   .then((res) => {
//     console.log(res.text);
//     res.text()
//   })
//   .then((text) => {
//     console.log(text);
//    })
//   .catch((e) => console.error(e));

const fs = require('fs');
const util = require ('util')

const promisified = util.promisify(fs.readFile);


(async () => {
    const data = await promisified('C:\\Users\\jbt\\Desktop\\newFile.txt', 'utf8');
    console.log(data);
})()


// Use fs.readFile() method to read the file
fs.readFile('C:\\Users\\jbt\\Desktop\\newFile.txt', 'utf8', (err, data) => {
    if (err) {
        console.log(err);
    }  
    else {
        console.log(data);
    }
});
  
console.log('readFile called');