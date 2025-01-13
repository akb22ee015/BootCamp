const fs = require("fs");

// fs.writeFile("msg.txt","Hello! Node I am Learning", (err)=> {
//     if(err) throw err;
//     console.log("File has been saved");
// })

fs.readFile("./message.txt","utf8",(err,data)=>{
    if(err) throw err;
    console.log(data);
})
