$(document).ready(function() {
    let tasksWrapper = document.querySelector("#task-wrapper");
    let deleteButtons = document.querySelector("#delete-buttons");


    if (localStorage.getItem("tasks") == null) {
        localStorage.setItem("tasks", JSON.stringify([]));
    } else {
        tasksFromStorage = JSON.parse(localStorage.getItem("tasks"));
        for (const task of tasksFromStorage) {
            renderTask(task)
        }
    }

    $(document).on("click", "#add-task", function() {
        addTask();
    })


    $(document).on("click", "#delete-selected", function() {
        deleteSelectedTasks();
    })

    $(document).on("click", "#reset", function() {
        $("#task-wrapper").empty();
        $("#delete-buttons").hide();
        localStorage.setItem("tasks", JSON.stringify([]));
    })

    function addTask() {
        let deadlineValue = $("#deadline-input").val().trim();
        let taskValue = $("#task-input").val().trim();
        $("#task-input").val("");
        $("#deadline-input").val("");
        if (taskValue == "" || deadlineValue == "") {
            alert("You cant add an empty task.");
            return;
        }

        let d1 = new Date(deadlineValue);
        let d2 = new Date();

        let newTask = {
            text: taskValue,
            deadline: msToMin(d1 - d2)
        }

        renderTask(newTask);

        tasksFromStorage = JSON.parse(localStorage.getItem("tasks"));
        tasksFromStorage.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasksFromStorage));
    }

    // function renderTask(task) {
    //     let newLi = $().create("li");
    //     console.log(newLi)
    //     newLi.addClass("list-group-item");
    //     newLi.attr("data-text", task.text);
    //     newLi.text(task.text);

    //     let newSpan = $.create("span");
    //     newLi.text(task.deadline);
    //     $("span").addClass("badge", "bg-danger", "text-light");

    //     newLi.append(newSpan);
    //     tasksWrapper.append(newLi);

    //     $("#delete-buttons").show();
    // }
    function renderTask(task) {
        let newLi = document.createElement("li");
        newLi.classList.add("list-group-item");
        newLi.setAttribute("data-text", task.text);
        newLi.innerText = task.text;
        newLi.addEventListener("click", function() {
            this.classList.toggle("active");
        });

        let newSpan = document.createElement("span");
        newSpan.classList.add("badge", "rounded-pill", "bg-danger");
        newSpan.innerText = task.deadline + " minutes left.";

        newLi.append(newSpan);
        tasksWrapper.append(newLi);

        deleteButtons.classList.remove("d-none");
    }


    // function deleteSelectedTasks() {
    //     tasksFromStorage = JSON.parse(localStorage.getItem("tasks"));

    //     for (const item of document.querySelectorAll(".list-group-item.active")) {
    //         let indexToBeDeleted = tasksFromStorage.findIndex(task => task.text == item.getAttribute("data-text"));
    //         tasksFromStorage.splice(indexToBeDeleted, 1);
    //         item.empty();
    //     }

    //     localStorage.setItem("tasks", JSON.stringify(tasksFromStorage));

    //     if (document.querySelectorAll(".list-group-item").length == 0) {
    //         $("#delete-buttons").hide();
    //     }
    // }

    function deleteSelectedTasks() {
        tasksFromStorage = JSON.parse(localStorage.getItem("tasks"));

        for (const item of document.querySelectorAll(".list-group-item.active")) {
            let indexToBeDeleted = tasksFromStorage.findIndex(task => task.text == item.getAttribute("data-text"));
            tasksFromStorage.splice(indexToBeDeleted, 1);
            item.remove();
        }

        localStorage.setItem("tasks", JSON.stringify(tasksFromStorage));

        if (document.querySelectorAll(".list-group-item").length == 0) {
            deleteButtons.classList.add("d-none");
        }
    }

    function msToMin(time) {
        return Math.round(time / 60000);
    }

    window.addEventListener("blur", () => {
        document.querySelector("title").innerHTML = "You have mutiple tasks to do!";
    });
    window.addEventListener("focus", () => {
        document.querySelector("title").innerHTML = "Welcome!";
    });
})