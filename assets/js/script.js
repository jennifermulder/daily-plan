// var currentHour = 0;

// let hourArr = ["9", "10", "11", "12", "13", "14", "15", "16", "17"];

// var row1 = $("#9").children();
// var hour = parseInt(`${hourArr[currentHour]}`);
// console.log(hour);

// var row2 = $("#10").children();
// var hour = parseInt(`${hourArr[1]}`);
// console.log(hour);


// var row3 = $("#11").children();
// var hour = parseInt(row3[0].textContent.trim());
// console.log(hour);

//current date 
var date = $("#currentDay").text(`${moment().format("dddd, MMMM Do")}`);


//Use to audit current time against time in far left block & change color
var auditTask = function () {
  for (let i = 0; i < 24; i++) {
    const $div = $("div#" + i);
    const currentHour = moment().format("H");
    console.log(currentHour);

    if (i > currentHour) {
      $($div).siblings("textarea")
        .addClass("future")
        .removeClass("description");
    }
    if (i < currentHour) {
      $($div).siblings("textarea")
        .addClass("past")
        .removeClass("description");
    }
    if (i == currentHour) {
      console.log(i);
      $($div).siblings("textarea")
        .addClass("present")
        .removeClass("description");
    }
    else {
    }
  };
};
auditTask();


//set audit function to run every 30 minutes
setInterval(function () {
  auditTask();
}, 1800000);

console.log(setInterval);


// value of text is changed
$("textarea").on("change", "input[type='text']", function () {
  console.log(62)




  // get current text
  var description = $(this)
    .val()
    .trim();
  console.log(textarea);

  // get the task's position in the list of other li elements
  var index = $(this)
    .closest(".description")
    .index();

  // update task in array and re-save to localstorage
  tasks[index].description = description;
  saveTasks();

  // Rerun audit to check new due date
  auditTask();
});




// save tasks with jQuery 
$(".saveBtn").click(function (event) {
  // console.log(event.target);

  var buttonClicked = $(event.target).attr('data-name');
  var taskTime = buttonClicked;
  var taskDescription = $("#text-area-" + buttonClicked).val().trim();
  console.log(taskTime);
  console.log(taskDescription);
  //  console.log("line98 =>", taskDescription.val().trim());
  //  console.log("line99 =>", taskDescription[0].value.trim());

  var task = {
    id: taskTime,
    taskDescription: taskDescription
  };

  saveTasks(task);

});

//helpers here

function saveTasks(task) {
  var tasks = JSON.parse(localStorage.getItem("tasks"));
  if (!tasks) {
    tasks = [];
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
  // console.log(SAVING TASKS=>',tasks);
}

//on page load need to pull from storage
function loadTasks() {
  var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  console.log('LOADING TASKS=>', tasks)
  // go through time collection, for every element in time collection find every element to be populated with local stoage data 
  // loop through collection
  for (var i = 0; i < tasks.length; i++) {
    // grab the task at each index
    var task = tasks[i];
    console.log(task);


    // find the textarea by ID using the task time / id
    var taskTimeSlotTextarea = $('#text-area-' + task.id);
    // add the task description to the textarea from the local storage data
    taskTimeSlotTextarea.val(task.taskDescription);
  }


}

loadTasks();