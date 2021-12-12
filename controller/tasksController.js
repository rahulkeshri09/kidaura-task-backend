const Task=require('../models/task');

module.exports.home=async function(req,res){
    try{
        console.log("inside home");
        return res.json(200,{
            message:"hd",
        })
    }catch(err){
        //if any error simply response 
        res.json(500,{
            message:"internal server error"
        })
    }
}
//module for fetchin tasks
module.exports.fetch=async function(req,res){
    try{
        console.log("fetch");
        let data=await Task.find({});
        console.log("after data await");
        return res.json(200,{
            message:"data successfully fetched",
            data:data
        })
    }catch(err){
        //if any error simply response 
        res.json(500,{
            message:"internal server error"
        })
    }
}


//function for removing non-alphanumric word and characters more than 30 in a word
function wordCheck(word){
    //remove non-alphanumric word
    let temp=word.replace(/\W/g,'');
    //remove characters more than 30 in a word
    if(temp.length>30){
        temp=temp.substring(0,30);
    }
    return temp;
}
//controller for creating a new task
module.exports.create=async function(req,res){
    try{
        //find task for not create copy
        let task=await Task.find({name:req.body.name});
        //if task alreaddy found task not created
        if(task.length>0){
            res.json(403,{
                message:"data already found",
                name:req.body.name
            })
            
        }
        //if task not found create a new task
        else{
            // sanitise words and sentence 
            let content=req.body.content;
            let str="";
            let word='';
            //count total no. of characters
            let count=0;
            //flag use for identify first character of word is not alphanumeric
            let flag=true;
            for(let i=0;i<content.length;i++){
                // seprate a word
                if(content==' ' || content.length-1===i){
                    if(flag){
                       continue; 
                    }
                    // call wordCheck function for removing non-alphanumeric word
                    // and remove characters after 30 words
                    let res=wordCheck(word);
                    count+=res.length;
                    //check extra spaces not exists
                    if(res.length!==0){
                        str=str+' '+res;
                    }
                    word="";
                    flag=true;
                }
                //check characters not more than 140
                else if(count+word.length>140){
                    break;
                }else{
                    //creatin a word
                    word+=word+content.charAt(i);
                    flag=false;
                }
            }
            // create task
            let newData=await Task.create(req.body);
            console.log("newdata=",newData);
            res.json(200,{
                message:"task created successfully",
                data:newData
            })
        }
    }catch(err){
        //if any error simply response 
        res.json(500,{
            message:"internal server error"
        })
    }
}


//module for updating a task
module.exports.update=async function(req,res){
    try{
        let task=await Task.findById(req.params.id);
        //console.log("req=",task);

        //checking name need to update or not
        if(req.body.name){
            task.name=req.body.name;
        }
        //checking content need to update or not
        if(req.body.content){
            task.content=req.body.content;
        }
        let updatedTask=await task.save();
        //console.log(task);
        return res.json(200,{
            message:"update successfully",
            data:updatedTask
        })

    }catch(err){
        //if any error simply response 
        return res.json(500,{
            message:"internal server error",
        })
    }
}


//module for delete a task
module.exports.delete=async function(req,res){
    try{
        let task=await Task.findById(req.params.id);
        //check task exists in db or not
        if(task){
            task.remove();
            return res.json(200,{
                message:"task succesfully deleted",
            })
        }else{
            return res.json(404,{
                message:"data not found"
            })
        }
    }catch(err){
        //if any error simply response 
        return res.json(500,{
            message:"internal server error",
        })
    }
}
