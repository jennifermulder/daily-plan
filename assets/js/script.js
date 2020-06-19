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
var auditTask = function() {
  for(let i = 0; i < 24; i++) {
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
$("textarea").on("change", "input[type='text']", function() {
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

  // get form values
  var taskTime = $(".hour").val();
  var taskDetails = $("textarea").val();

  //function to saveTasks to an array in localStorage.
  function saveTasks() {
      var oldTaskData = JSON.parse(localStorage.getItem("taskData"));
      if (!oldTaskData) {
          oldTaskData = {
              timeOfDay: [],
              taskDescription: [],
          };

          oldTaskData.timeOfDay.push(taskTime);
          oldTaskData.taskDescription.push(taskDetails);
          localStorage.setItem("taskData", JSON.stringify(oldTaskData));
          console.log(oldTaskData);
      }

  }

  // save tasks in jQuery 
    $(".saveBtn").click(function() {
        
         
        // // save in tasks array
        // tasks.toDo.push({
        //     time: taskTime,
        //     details: taskDetails
        // });
    
        saveTasks();
       
    });

