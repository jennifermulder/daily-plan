var row1 = $("#row1").children();
var hour = parseInt(row1[0].textContent.trim());
console.log(hour);

var row2 = $("#row1").children();
var hour = parseInt(row2[0].textContent.trim());
console.log(hour);



var now = moment().hours();
console.log(now);

if (hour < now) {
    console.log("if statment working");
}








var hour9 = moment(date, "L").set("hour", 9);
console.log(hour9);

var hour10 = moment(date, "L").set("hour", 10);
console.log(hour10);

 var date = $("#currentDay").text(`${moment().format("dddd, MMMM Do")}`);
 console.log(date);




//Use to audit current time against time in far left block
var auditTask = function(taskEl) {
    // get date from task element
    var date = $(taskEl).find("span").text().trim();
    // ensure it worked
    console.log(date); 
  
    // convert to moment object at 5:00pm
    var time = moment(date, "L").set("hour", 17);
  
    // remove any old classes from element
    $(taskEl).removeClass("description");
  
    // apply new class if task is near/over due date
    if (moment().isAfter(time)) {
      $(taskEl).addClass("list-group-item-danger");
    }
    if (moment().isAfter(time)) {
        $(taskEl).addClass("list-group-item-danger");
    }
    else if (Math.abs(moment().diff(time, "days")) <= 2) {
      $(taskEl).addClass("list-group-item-warning");
    }
    console.log(taskEl)
  };



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
  
    // recreate span element with bootstrap classes
    var taskSpan = $("<span>")
      .addClass("badge badge-primary badge-pill")
      .text(description);
  
    // replace input with span element
    $(this).replaceWith(taskSpan);
  
     // Pass task's <li> element into auditTask() to check new due date
     auditTask($(taskSpan).closest(".description"));
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
