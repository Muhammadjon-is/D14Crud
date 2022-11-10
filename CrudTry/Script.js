const postlist = document.querySelector(".posts-list");
const addPostForm = document.querySelector(".add-post-form");
const NameValue = document.getElementById("Name-value");
const UserValue = document.getElementById("UserName-value");
const EmailValue = document.getElementById("email-value");
const btnSubmit = document.querySelector(".btn")
let output = "";

const renderPost = (posts) => {
  console.log(posts);
  posts.forEach((post) => {
    output += `

    <div class="card mt-4 col-md-6 bg-light">
      <div class="card-body" data-id=${post.id}>
        <h5 class="card-title">${post.name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${post.username}</h6>
        <p class="card-text">${"Email: " + post.email}</p>
        <a href="#" class="card-link" id="edit-post">Edit</a>
        <a href="#" class="card-link" id="delete-post">Delete</a>
      </div>
    </div>
`;
  });

  postlist.innerHTML = output;
};

const url = "https://jsonplaceholder.typicode.com/users";

//  get the posts

fetch(url)
  .then((res) => res.json())
  .then((data) => renderPost(data));

postlist.addEventListener("click", (e) => {
e.preventDefault()

let delButtonsPressed = e.target.id == "delete-post";
let editButtonsPressed = e.target.id == 'edit-post';

let idR = e.target.parentElement.dataset.id;

// delete remove  the existing post
//  method:Delete

if(delButtonsPressed){
  fetch(`${url}/${idR}`, {
  method:'DELETE',
  })
  .then(res => res.json())
  .then(() => location.reload())

  // console.log("remove post");
}
//  edit button
 if(editButtonsPressed){

  const parent = e.target.parentElement;
  let titleContent = parent.querySelector(".card-title").textContent;
  let UserName = parent.querySelector(".card-subtitle").textContent;
  let UserEmail = parent.querySelector(".card-text").textContent

  NameValue.value = titleContent;
  UserValue.value = UserName;
  EmailValue.value = UserEmail

  console.log(titleContent, UserName, UserEmail);
  console.log("edited");
 }

//  Update 
// Method: PATCH

 btnSubmit.addEventListener("click" , (e) => {
  e.preventDefault()
  fetch(`${url}/${idR}`, {
    method:'PATCH',
    headers:{
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({
      name: NameValue.value,
           username: UserValue.value,
           email: EmailValue.value,
    })
    
  })
  .then(res => res.json())
  .then(() => location.reload())

   console.log("post updated");
 })



});
// Create Insert
//  Method POST
addPostForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(NameValue.value);

  fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name: NameValue.value,
      username: UserValue.value,
      email: EmailValue.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const dataArr = [];
      dataArr.push(data);
      renderPost(dataArr);
    });

    // reset input field to empty
    
    NameValue.value = ""
    UserValue.value = ""
    EmailValue.value =y
  
  });
