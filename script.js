var now = dayjs();
// Wraps all code that interacts with the DOM in a call to jQuery to ensure that the code isn't run until the browser has finished rendering all the element in the html.
$(function () {
  // Adds a listener for click events on the save button. Uses the id in the containing time-block as a key to save the user input in local storage.
  var buttons = $('.btn');
  buttons.on('click', function () {
    var button = $(this);
    var hour = button.parent().attr('id');
    var description = button.siblings('.description').val();
    localStorage.setItem(hour, description);
  });
  
  // Applies the past, present, or future class to each time block by comparing the id to the current hour. 
  var timeBlocks = $('.time-block');
  timeBlocks.each(function ()
  {
    var timeBlock = $(this);
    var hour = timeBlock.attr('id');
    var hourInt = parseInt(hour.split('-')[1]);
    if (hourInt < now.hour())
    {
      timeBlock.addClass('past');
    }
    else if (hourInt === now.hour())
    {
      timeBlock.addClass('present');
    } else
    {
      timeBlock.addClass('future');
    }
  });
  // Gets any user input that was saved in localStorage and sets the values of the corresponding textarea elements.
  var timeBlockDescriptions = $('.description');
  timeBlockDescriptions.each(function ()
  {
    var description = $(this);
    var hour = description.parent().attr('id');
    description.val(localStorage.getItem(hour));
  }
  );
  // Displays the current date in the header of the page.
  var currentDay = $('#currentDay');
  currentDay.text(now.format('dddd, MMMM D, YYYY'));
});
