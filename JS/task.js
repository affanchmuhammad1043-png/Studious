let saved_list = JSON.parse(localStorage.getItem("tasks")) || []

let add_btn = document.querySelector(".add-btn")
let clear_all_btn = document.querySelector(".clear-btn")
let task_list = document.querySelector(".task-list")
let total_tasks = document.querySelector(".total")
let input_box = document.querySelector("#input-box")

let value = 0



function displayTask(taskText) {

    let new_task = document.createElement("div")

    new_task.innerHTML = `
        <div class="task">
            <div id="task-left">
                <input class="input" type="checkbox">
                <span class="task-text">${taskText}</span>
            </div>

            <button class="delete-btn">×</button>
        </div>
    `

    task_list.appendChild(new_task)

    value += 1
    total_tasks.innerText = value



    let delete_btn = new_task.querySelector(".delete-btn")

    delete_btn.addEventListener("click", function () {

        new_task.remove()

        value -= 1
        total_tasks.innerText = value

        saved_list = saved_list.filter(function(task) {
            return task !== taskText
        })

        localStorage.setItem(
            "tasks",
            JSON.stringify(saved_list)
        )
    })

    let checkbox = new_task.querySelector(".input")

    checkbox.addEventListener("change", function () {

        let task_text = new_task.querySelector(".task-text")

        if (checkbox.checked) {
            task_text.style.textDecoration = "line-through"
        } else {
            task_text.style.textDecoration = "none"
        }
    })
}

saved_list.forEach(function(task) {

    displayTask(task)

})
add_btn.addEventListener("click", function () {

    let taskText = input_box.value.trim()

    if (taskText === "") {
        alert("Please enter a task!")
        return
    }

    saved_list.push(taskText)

    localStorage.setItem(
        "tasks",
        JSON.stringify(saved_list)
    )


    // Display task
    displayTask(taskText)


    // Clear input
    input_box.value = ""
})


// CLEAR ALL
clear_all_btn.addEventListener("click", function () {

    task_list.innerHTML = ""

    saved_list = []

    localStorage.removeItem("tasks")

    value = 0
    total_tasks.innerText = value
})