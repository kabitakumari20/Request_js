const readlineSync=require("readline-sync")
const axios = require('axios');
const fs=require("fs");
let readline=require("readline-sync");
console.log("************Welcome****Meraki Navgurukul*************")
async function avliable_course(){
    var frist_api=await axios.get("http://saral.navgurukul.org/api/courses")
    var frist_url = JSON.stringify(frist_api.data,null,2)
        fs.writeFile("req.json",frist_url,(err)=>{
            return("data is save")
        });    
    var javas_data=JSON.parse(frist_url);
    var course_ary = []
    var id_list = []
    var course  = []
    let course_list=javas_data["availableCourses"]
    var courses_index = 0
    while (courses_index < course_list.length){
        course_available = course_list[courses_index]["name"];
        course.push(course_available)
        id_available = course_list[courses_index]["id"]
        id_list.push(id_available)
        console.log(courses_index+1,course_available,id_available)
        courses_index+=1
    }
    var user=readlineSync.questionInt("Enter Avliable  index:-")
    var b=id_list[user-1]
    async function avliable_id(){
        var slug_list=[]
        var sec_api=await axios.get("http://saral.navgurukul.org/api/courses/"+ b +"/exercises")
            var content=JSON.stringify(sec_api.data,null,2)
            fs.writeFile("data1.json",content,function(err){
            })
            var content1=JSON.parse(content)
            let i=0
            while (i<content1['data'].length){
                console.log(i+1,content1["data"][i]["name"])
                let storeV = content1["data"][i]["childExercises"]
                let stringV = JSON.stringify(storeV)
                if(stringV =="[]"){
                    console.log("          ",    "[]")
                    var store=content1["data"][i]["slug"]
                    slug_list.push(store)
                }
                else{
                    var j=0
                    while (j<content1["data"][i]["childExercises"].length){
                        console.log("            ",     j+1,content1["data"][i]["childExercises"][j]["name"])
                        j+=1
                    } 
                }    
                i+=1   
            }
        var index1=0
        while (index1<slug_list.length){
            console.log(index1+1,slug_list[index1])
            index1++
        }    
        var slug=readlineSync.questionInt("Entre The Slug:-")
        async function third_api(c){
            var data3= await  axios.get(" http://saral.navgurukul.org/api/courses/"+(b)+"/exercise/getBySlug?slug="+slug_list[c])
            var content2=JSON.stringify(data3.data,null,2)
            var content3=JSON.parse(content2)
            console.log(content3["content"])
            fs.writeFile("slug_data3.json",content2,function (err){
            })
            async function up(){
                var user= readlineSync.questionInt("Enter The what u want \n 1 up \n 2 next \n 3 previes:-")
                if (user=="1"){
                    avliable_course()
                    avliable_id()
                    third_api()
                }
                else if (user=="2"){
                    if (slug==1){
                        console.log(slug)
                        third_api(slug)
                        slug++
                    }
                    else if (slug>1){
                        console.log(slug)
                        third_api(slug)
                        slug++
                    }
                    else{
                        console.log("their is no next")
                    }
                }
                else if (user=="3"){
                    console.log(slug)
                    if (slug>=0){
                        slug=slug-1
                        third_api(slug)
                    }   
                    else{
                        console.log("page not found")
                        console.log("")
                    }
                }  
                else{
                    console.log("invaild input")
                    console.log(" ")
                }
            }
            up()
        }
        third_api(slug-1)
    }
    avliable_id()
    }
avliable_course()