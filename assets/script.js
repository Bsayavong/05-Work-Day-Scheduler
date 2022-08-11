//Create my own initialization as there is no "init" function in JavaScript.
$(init);

function init() {
  // Acquire live date via moment.js with appropriate token to display desired output.
  $("#currentDay").text(moment().format("dddd, MMMM Do"));

  // Begin intervals for every minute and applies color to the time blocks while adjusting to the live time.
  colorTimeBlocks();
  setInterval(colorTimeBlocks, 60000);

  // When saved, this function will update time blocks with data in local storage.
  $(".time-block").each(function() {
    var blockId = $(this).attr("id");
    // Load the saved data that was reserved inside local storage.
    $("#" + blockId + " textarea").text(localStorage.getItem(moment().format("DDDYYYY") + blockId));
  });

  // Handler for the save buttons
  $(".saveBtn").on("click", handleSave);
}

function colorTimeBlocks() {
  //Converting first argument to a string, then parse the string all while returning a value.
  $(".time-block").each(function() {
    var blockHr = parseInt($(this).attr("id").replace("hr-", ""));
    var currentHr = parseInt(moment().format("H"));
    
    // Removing any added class properties but not the class attribute.
    $(this).removeClass("past present future");
    
    // Statement indentifing color blocks based on past, present, future classes.
    if (blockHr < currentHr) {
      $(this).addClass("past");
    } else if (blockHr > currentHr) {
      $(this).addClass("future");
    } else {
      $(this).addClass("present");
    }
  });
}

function handleSave(event) {
  // Aquiring id of our parent
  var hrId = $(this).parent().attr("id");
  // Saves entry in textarea in local storage, can be refreshed and last entry will be present.
  localStorage.setItem(moment().format("DDDYYYY") + hrId, $("#" + hrId + " textarea").val());
}
