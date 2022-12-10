let tasks = []

document.addEventListener("DOMContentLoaded", () => {
    loadFromStorage()
  })

function addTask() {
    const task = document.getElementById("task").value
    let deadline = document.getElementById("deadline").value
    deadline = deadline.split("-").reverse().join("-")
    const time = document.getElementById("time").value
    let notes = {
        task: task,
        deadline: deadline,
        time: time,
    }
    if (task === "" || deadline === "" || time === "") {
        if (task === "") {
            alert("missing task")

        }
        if (deadline === "") {
          alert("missing deadline")
       

        }
        if (time === "") {
            alert("missing time")

        }
        event.preventDefault
    }
    else {
        tasks.push(notes)
        addNote(b)
        removeSelect()
        savaInLocalStorage()
    }
}
let b="b"
let a="a"
function addNote(b) {
    const note = document.getElementById("note")
    let html = ""
    let i = 0
    
       for (let j = 0; j < tasks.length; j++) {

        html += `<div  class="p-2-${b}" id="note${i}">
       <i class="bi bi-file-excel-fill" ></i>
         <svg xmlns="http://www.w3.org/2000/svg" onclick="removeNote(${i})" width="25" height="25" fill="currentColor" class="bi bi-file-excel-fill" viewBox="0 0 16 16">
         <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM5.884 4.68 8 7.219l2.116-2.54a.5.5 0 1 1 .768.641L8.651 8l2.233 2.68a.5.5 0 0 1-.768.64L8 8.781l-2.116 2.54a.5.5 0 0 1-.768-.641L7.349 8 5.116 5.32a.5.5 0 1 1 .768-.64z"/>
       </svg>
       <p class="p-task-fs-1" >${tasks[j].task}</p> 
       <p class="p-deadline">${tasks[j].deadline}</p>
      <p class="p-time">${tasks[j].time}</p>
     </div>`
        i++

    }
    note.innerHTML = html
}

function removeNote(index) {
    tasks.splice(index, 1) 
         addNote(a)
    savaInLocalStorage()
}

function removeSelect() {
    document.getElementById("task").value = ""
    document.getElementById("deadline").value = ""
    document.getElementById("time").value = ""
}


function savaInLocalStorage() {
       let stringjson = JSON.stringify(tasks)
    localStorage.setItem("tasks", stringjson)
}
function loadFromStorage() {
    let json = localStorage.getItem("tasks")
    if (json) {
        tasks = JSON.parse(json)
        addNote(a)
    }
}
function toRemoveAfterTimePass() {
    let json = localStorage.getItem("tasks")
    let date = new Date()
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;
    if (json) {
        tasks = JSON.parse(json)
    }
    j = 0
    for (let item of tasks) {
        let taskDate = new Date(item.deadline.split("-").reverse().join("-")).getTime()
        let currentDateTime = new Date(currentDate).getTime()
        if (taskDate < currentDateTime) {
            removeNote(j)
        }
        if (taskDate === currentDateTime) {
             let arrTime = item.time.split(':', 2)
            let time = arrTime[0] * 60 + Number(arrTime[1])

            if (time < ((new Date().getHours() * 60) + new Date().getMinutes())) {
                removeNote(j)
            }
        }
        j++
    }
}
let intervalId = window.setInterval(function () {
    toRemoveAfterTimePass()
}, 5000);


