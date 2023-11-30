const cl=console.log;

const postContainer=document.getElementById("postcards");
const formContainer=document.getElementById("form");
const titleContainer=document.getElementById("title");
const bodyContainer=document.getElementById("body");
const userIdContainer=document.getElementById("userId");
const UpdateBtn=document.getElementById("UpdateBtn");
const AddBtn=document.getElementById("AddBtn");

let baseUrl='https://jsonplaceholder.typicode.com';
let postUrl=`${baseUrl}/posts`;

let postArry=[];

// const creatPost=(ele)=>{
//     let xhr= new XMLHttpRequest();
//     xhr.open("post",postUrl,true);

//     xhr.send(JSON.stringify(ele))
//     xhr.onload= function(){
//         if( xhr.status===200 || xhr.status===201){
//             ele.id=JSON.parse(xhr.response).id
//             postArry.push(ele);
//             // templeting(postArry) 
//             addPost(ele);
//             formContainer.reset();
//         }
//     }
// }

const addPost=(post)=>{
    let div=document.createElement('div');
    // cl(div)
    div.className="card mb-4";
    cl(div)
    div.id=post.id
    div.innerHTML=`
                    <div class="card-header">
                    <h2>${post.title}</h2>
                </div>
                <div class="card-body">
                    <p>${post.body} </p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button class="btn btn-outline-primary" onclick="onEditBtn(this)">Edit</button>
                    <button class="btn btn-outline-danger"onclick="onDeleteBtn(this)">Delete</button>
                </div>
                `
                postContainer.append(div);
}

const onEditBtn=(ele)=>{
    // cl(ele)
    let editId=ele.closest(".card").id;
    localStorage.setItem("editedId",editId);
    // cl(editId)
    let editUrl=`${postUrl}/${editId}`;
    // cl(editUrl);
    UpdateBtn.classList.remove("d-none");
    AddBtn.classList.add("d-none");
    junricApi("GET",editUrl);

    function scroll() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
      scroll()

}
const onUpdatePost=(eve)=>{
    let updatedObj={
        
    }
    let updatedId=localStorage.getItem("editedId");
    let updateUrl=`${postUrl}/${updatedId}`;
    
    junricApi("PATCH",updateUrl);
}
const junricApi=((methodName,apiUrl)=>{
    let xhr= new XMLHttpRequest();
    xhr.open(methodName,apiUrl,true);
    xhr.send()
    xhr.onload=()=>{
        if(xhr.status>=200 ||xhr.status<=299 && xhr.readyState === 4){
            let data=JSON.parse(xhr.response);
            if(methodName=== "GET"){
                if(Array.isArray(data)){
                    templeting(data);
                }else{
                    // cl(data)
                    titleContainer.value= data.title,
                    bodyContainer.value= data.body,
                    userIdContainer.value= data.userId
                }
            }else if(methodName==="PATCH"){
                let updatedId=localStorage.getItem("editedId");

               
        }
    }
    
}})
junricApi("GET",postUrl);

let templeting=(ele)=>{
    let result="";
    ele.forEach(post => {
        result+=` <div class="card mb-4" id="${post.id}">
                    <div class="card-header">
                        <h2>${post.title}</h2>
                    </div>
                    <div class="card-body">
                        <p>${post.body} </p>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button class="btn btn-outline-primary" onclick="onEditBtn(this)">Edit</button>
                        <button class="btn btn-outline-danger"onclick="onDeleteBtn(this)">Delete</button>
                    </div>
                    </div>`
    });
    postContainer.innerHTML=result;
}

const onsubmitHandler=(eve)=>{
    eve.preventDefault();
    let newPost={
        title:titleContainer.value,
        body:bodyContainer.value,
        userId:userIdContainer.value
    }
    // cl(newPost)
    // creatPost(newPost);
    addPost(newPost);
}



// const getAllPosts=()=>{
//     //1--->> creat a object / instance XMLHttpRequest
//     let xhr= new XMLHttpRequest();

//     //2---> configraion
// xhr.open("GET",postUrl,true);
// xhr.send();
// xhr.onload=function(){
//     if(xhr.status===200){
//         // cl(xhr.response)
//         postArry=JSON.parse(xhr.response);
//         // cl(postData)
//         templeting(postArry);
//     }else{
//         alert('something went wrong')
//     }
//     // templeting()
//     // cl(xhr.status)   200
//     // cl(xhr.staus.Text)  200
// }
// }
// getAllPosts();
formContainer.addEventListener("submit",onsubmitHandler);
UpdateBtn.addEventListener("click",onUpdatePost)

// const onUpdatePost=()=>{
//     let updatedObj={
//         title:titleContainer.value,
//         body:bodyContainer.value,
//         userId:userIdContainer.value
       
//     }
//     cl(updatedObj)
//     let getEditedId=localStorage.getItem("editId");
//     //  cl(getEditedId);
//     let updateUrl=`${baseUrl}/posts/${getEditedId}`
//     // cl(updateUrl)
//     let xhr=new XMLHttpRequest();
//     xhr.open("PATCH",updateUrl,true);
//     xhr.send(JSON.stringify(updatedObj));
//     xhr.onload=()=>{
//         if(xhr.status===200){
//             let getpostIndexOf=postArry.findIndex(post=>{
//                 return post.id == getEditedId
//             })
//             cl(getpostIndexOf)
//             postArry[getpostIndexOf].title=updatedObj.title,
//             postArry[getpostIndexOf].body=updatedObj.body,
//             postArry[getpostIndexOf].userId=updatedObj.userId,
        
//             templeting(postArry);
//             AddBtn.classList.toggle("d-none");
//             UpdateBtn.classList.toggle("d-none");
//             formContainer.reset();
//         }
        
//     }}
//     const onDeleteBtn=(eve)=>{
//         let getDeleteId=eve.closest(".card").id;
//         // cl(getDeleteId)
//         let getDeleteUrl=`${baseUrl}/posts/${getDeleteId}`;
//         cl(getDeleteUrl);

//         let xhr=new XMLHttpRequest();
//         xhr.open("DELETE",getDeleteUrl);

//         xhr.send();
        
//         xhr.onload=function(){
//             if(xhr.status ===200){
//                 cl(xhr.response)
//                 let deletecard=document.getElementById(getDeleteId);
//                 cl(deletecard)
//                 deletecard.remove();
//             }
//         }
//     }


// const onEditBtn=(eve)=>{
//     let getEditId=eve.closest(".card").id
//     localStorage.setItem("editId",getEditId);
//     // cl(getEditId)
//     let getEditedObjUrl=`${baseUrl}/posts/${getEditId}`
//     // cl(getEditedObj)

//     let xhr=new XMLHttpRequest(); //creat instant /obj

//     xhr.open("GET",getEditedObjUrl,true); // it req to backend with  1 method name  2 url path diclaration 3 beheviar handal asinq
//     xhr.send()
//     xhr.onload=()=>{
//         if(xhr.status===200 ){
//             let getEditedObj=JSON.parse(xhr.response)
//             titleContainer.value=getEditedObj.title,
//             bodyContainer.value=getEditedObj.body,
//             userIdContainer.value=getEditedObj.userId

//             AddBtn.classList.toggle("d-none");
//             UpdateBtn.classList.toggle("d-none");
         
//         }else{

//         }
//     }
// }









