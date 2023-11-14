const fs = require('fs');
var openTesData = "./openTesData.json"
var projectName = document.getElementById("projectName");
var authorName = document.getElementById("authorName");
var projectUrl = document.getElementById("projectUrl");

function addProject(){
    projectName = projectName.value;
    authorName = authorName.value;
    projectUrl = projectUrl.value;
    var data = fs.readFileSync(openTesData);
    console.log(data);

}