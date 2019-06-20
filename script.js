var morning = 7;
var noon = 12;
var evening = 18;
var night = 21;

var currentHour = -1;
var currentMin = -1;
var currentSec = -1;

var alarmHour = -1;
var alarmMin = -1;

var audio = new Audio();
audio.src = 'media/01_USSR.mp3';
var alarmCounter = 0;

var alarmImageTrigger = false;

var getListElement = function(arg)
{
  stuff = document.getElementById(arg);
  element = stuff.options[stuff.selectedIndex].value;

  return element;
}

var checkTimeLen = function(number){
  var number = number.toString();
  if (number.length == 1)
  {
    return '0' + number;
  }
  return number;
};

// Getting it to show the current time on the page
var showCurrentTime = function()
{
    // display the string on the webpage
    var clock = document.getElementById('clock');

    var currentTime = new Date();

    var hours = currentTime.getHours();
    currentHour = hours;

    var minutes = currentTime.getMinutes();
    currentMin = minutes;

    var seconds = currentTime.getSeconds();
    currentSec = seconds;

    // put together the string that displays the time
    var clockTime = checkTimeLen(hours) + ':' + checkTimeLen(minutes) + ':' + checkTimeLen(seconds);

    clock.innerText = clockTime;
};

// Getting the clock to increment on its own and change out messages and pictures
var updateClock = function()
{
  var time = new Date().getHours();
  var messageText;
  var image = "media/normalTime.jpg";

  var timeEventJS = document.getElementById("timeEvent");
  var lolcatImageJS = document.getElementById('lolcatImage');

  if (alarmImageTrigger == false){
    if (time >= morning && time < noon)
    {
      image = "media/normalTime.jpg";
      messageText = "\"Good morning!\"";
    }
    else if (time >= noon && time < evening)
    {
      if (time < 13){
        image = "media/cat_mccree.jpg";
        messageText = "\"It's HIGH noon\"";
      }
      else{
        image = "media/cat2.jpg";
        messageText = "\"It's afternoon\"";
      }
    }
    else if (time >= evening && time < night)
    {
      image = "cat3.jpg";
      messageText = "\"Good evening!\"";
    }
    else {
      image = "media/Cat_sleep.jpg";
      messageText = "\"It's night!\"";
    }
  }
  else 
  {
    image = "media/commie_cat.jpeg";
    messageText = "";
  }

  console.log(messageText);
  timeEventJS.innerText = messageText.toUpperCase();
  lolcatImage.src = image;

  showCurrentTime();
};
updateClock();

// Getting the Party Time Button To Work
var alarmButton = document.getElementById("setAlarmButton");

var showCurrentAlarm = function()
{
  var alarm = document.getElementById('setAlarmTime');

  var hours = getListElement('alarmHourSelector');
  var minutes = getListElement('alarmMinSelector');

  alarmHour = hours;
  alarmMin = minutes;

  // put together the string that displays the time
  alarmTime = 'Alarm set to ' + checkTimeLen(hours) + ' : ' + checkTimeLen(minutes);

  alarm.innerText = alarmTime;
};

var setNewAlarm = function()
{
  showCurrentAlarm();
};

alarmButton.addEventListener("click", setNewAlarm);


// Getting the Stop Button To Work
var stopButton = document.getElementById("setStopButton");

var stopAlarm = function()
{
  audio.pause();
  audio.src = 'media/01_USSR.mp3';
  alarmImageTrigger = false;
  alarmCounter = 0;
};
stopButton.addEventListener("click", stopAlarm);


var playAlarm = function(){

  if (alarmHour == currentHour && alarmMin == currentMin){
    alarmImageTrigger = true;
    audio.play();
    alarmCounter += 1;
  }
  else{
    alarmImageTrigger = false;
  }

};

var checkAlarm = function(){
  if (currentSec == 0){
    if (alarmHour == currentHour && alarmMin == currentMin){
      alarmImageTrigger = true;

      playAlarm();
    }
  }

};
checkAlarm();

var incrementAlarmCounter = function(){

  if (alarmCounter > 0){
    alarmCounter += 1;
  }
  if (alarmCounter == 76){
    stopAlarm();
  }
};

// Getting the clock to increment once a second
var oneSec = 1000;

setInterval(updateClock, oneSec);
setInterval(incrementAlarmCounter, oneSec);
setInterval(checkAlarm, oneSec);


