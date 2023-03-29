// ! ---------- TODO List ------ 
let form = document.querySelector("form"); 
let inpName = document.querySelector("form #name"); 
let inpUrl = document.querySelector('form #imageUrl');
let inpPhone = document.querySelector('form #phone');
let list = document.querySelector("ul"); 
 
// ? read 
createTask(); 
function createTask() { 
  if (!localStorage.getItem("tasks-data")) { 
    localStorage.setItem("tasks-data", "[]"); 
  } 
  let data = JSON.parse(localStorage.getItem("tasks-data")); 
 
  list.innerHTML = ""; 
  data.forEach((elem, index) => { 
    console.log(elem)

    list.innerHTML += ` 
    <li> 
    <img src = "${elem.taskUrl}" width = "100" height = "100" alt = "${elem.taskName}"/>
    <p>${elem.taskName}</p>
    <p>${elem.taskPhone}</p>
      <button id="btnDel" onclick="deleteTask(${index})">Delete</button> 
      <button id="btnEdit" onclick="editTask(${index})">Edit</button> 
    </li> 
    `; 

  }); 
} 
 
// ! create-добавление или чтение 
form.addEventListener("submit", (event) => { 

  event.preventDefault(); 
  if (!inpUrl.value.trim() ||
  !inpName.value.trim() || !inpPhone.value.trim()) { 
    
    alert("Заполните поле!"); 
    return; 
  }; 

  let obj = { 
    taskUrl: inpUrl.value,
    taskName: inpName.value,
    taskPhone: inpPhone.value
}; 

  let data = JSON.parse(localStorage.getItem("tasks-data")); 
 
  data.push(obj); 
  localStorage.setItem("tasks-data", JSON.stringify(data)); 
 
  inpUrl.value = ""; 
  inpName.value = "";
  inpPhone.value = "",

  createTask(); 
}); 
 
//! Delete-удаление 

function deleteTask(index) { 

  let data = JSON.parse(localStorage.getItem("tasks-data")); 

  data.splice(index, 1); 
  localStorage.setItem("tasks-data", JSON.stringify(data)); 
  
  createTask(); 
} 
 


// //!  Edit-изменение 

let modal = document.querySelector(".modal"); 
let inpNameEdit = document.querySelector(".modal #nameEdit"); 
let inpUrlEdit = document.querySelector('.modal #urlEdit');
let inpPhoneEdit = document.querySelector('.modal #phoneEdit')
let btnSave = document.querySelector(".modal_body #btnSave"); 
let btnClose = document.querySelector(".modal_body #btnClose"); 

 

function editTask(index) { 
  modal.style.display = "block"; 

  let data = JSON.parse(localStorage.getItem('tasks-data')) 

  inpUrlEdit.value = data[index].taskUrl; 
//   inpUrlEdit.setAttribute('id',index);
  inpNameEdit.value = data[index].taskName;
  inpNameEdit.setAttribute('id',index);
  inpPhoneEdit.value = data[index].taskPhone;
//   inpPhoneEdit.setAttribute('id',index);
} 

btnClose.addEventListener('click', () => { 
  modal.style.display='none' 
}) 

btnSave.addEventListener('click', () => { 
  let id = inpNameEdit.id 

  let data = JSON.parse(localStorage.getItem('tasks-data')) 

  let newObj = { 
    taskName:inpNameEdit.value, 
    taskPhone: inpPhoneEdit.value,
    taskUrl: inpUrlEdit.value,
  } 
 
  data.splice(id,1,newObj) 

  localStorage.setItem('tasks-data', JSON.stringify(data)) 

  modal.style.display='none' 
  createTask() 
})