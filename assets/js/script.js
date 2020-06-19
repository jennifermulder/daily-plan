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

//current time
var now = moment().hours();
console.log(now);

//test color
if (hour < now) {
    $(".description").addClass("past");
    $(".description").removeClass("description");
    console.log("if statment working");
}


for(let i = 0; i < 24; i++) {
  const $div = $("div#" + i);
  const currentHour = moment().format("H");

  if(i < currentHour) {

    $($div).siblings(".task-description")
    .addClass("past")
    .removeClass("description");
  }
}


//Use to audit current time against time in far left block
var auditTask = function() {

  var textBox = $("row").children([1]);
  console.log(textBox);
  
    
  // remove any old classes from element
  $("row2").children[1]().removeClass("description");

  // apply new class if task is near/over due date
  if (hour === now) {
    $(taskEl).addClass("present");
  }
  if (moment().isAfter(hour)) {
    $(taskEl).addClass("past");
  }
  else {
    $(taskEl).addClass("future");
  }

  currentHour++;

  };
  
  


// if the current time is during working hours
if (now < 18 && now > 8) {
  auditTask();
}



//figure out how to make "hour" loop through i






  //Check everything with a certain class to be applicable to be audited
  setInterval(function () {
    $(".card .list-group-item").each(function (el) {
      auditTask(el);
    });
  }, 3600000);



// value of text is changed
$(".description").on("change", "input[type='text']", function() {
    // get current text
    var description = $(this)
      .val()
      .trim();
  
      
    // get the task's position in the list of other li elements
    var index = $(this)
      .closest(".description")
      .index();
  
    // update task in array and re-save to localstorage
    tasks[index].description = description;
    saveTasks();
  
    // Pass task's <li> element into auditTask() to check new due date
     auditTask($(this).closest(".description"));
  });

  
  //function to saveTasks to an array in localStorage.
  function saveTasks(time, task) {
      var oldTaskData = JSON.parse(localStorage.getItem("taskData"));
      if (!oldTaskData) {
          oldTaskData = {
              timeOfDay: [],
              taskDescription: [],
          };

          oldTaskData.timeOfDay.push(timeOfDay);
          oldTaskData.taskDescription.push(taskDescription);
          localStorage.setItem("taskData", JSON.stringify(oldTaskData));
          console.log(oldTaskData);
      }

  }

  // save tasks in jQuery 
    $("#task-form-modal .btn-save").click(function() {
        // get form values
        var taskText = $("#modalTaskDescription").val();
        var taskDate = $("#modalDueDate").val();
         
        // save in tasks array
        tasks.toDo.push({
            text: taskText,
            date: taskDate
        });
    
        saveTasks();
        
    });


  //add event listener on save button to save to local storage when clicked
