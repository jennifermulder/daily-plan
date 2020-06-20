
//current date 
var date = $("#currentDay").text(`${moment().format("dddd, MMMM Do")}`);


//Audit current time against time in far left block & change color of text field
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


// When save button is clicked: save task time and description to array
$(".saveBtn").click(function (event) {

  var buttonClicked = $(event.target).attr('data-name');
  var taskTime = buttonClicked;
  var taskDescription = $("#text-area-" + buttonClicked).val().trim();

  var task = {
    id: taskTime,
    taskDescription: taskDescription
  };

  saveTasks(task);

});

//helpers here
//save task array to local storage
function saveTasks(task) {
  //find any items currently saved in local storage
  var tasks = JSON.parse(localStorage.getItem("tasks"));
  if (!tasks) {
    tasks = [];
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//on page load, pull from storage or create a blank array
function loadTasks() {
  var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
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