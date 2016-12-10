

'use strict';

String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}


//Todo List Script
function get_todos() {
    var todos = new Array;
    var todos_str = localStorage.getItem('todo');
    if (todos_str !== null) {
        todos = JSON.parse(todos_str);
    }
    return todos;
}

function add() {
    var task = "00"+document.getElementById('task').value;
    var todos = get_todos();
    todos.push(task);
    localStorage.setItem('todo', JSON.stringify(todos));

    show();

    return false;
}

function remove() {
    var id = this.getAttribute('id');
    var todos = get_todos();
    todos.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(todos));

    show();

    return false;
}

//if the first digit is 0 then the task is not done
function markAsDone(){
    var id = parseInt(this.getAttribute('id'));
    var todos = get_todos();
    var task = todos[id].replaceAt(0, "1");
    console.log(task);
    todos.splice(id, 0, task);
    todos.splice(id+1, 1);
    console.log(todos);
    localStorage.setItem('todo', JSON.stringify(todos));
    show();

    return false;
}

function markAsUnDone(){
    var id = parseInt(this.getAttribute('id'));
    var todos = get_todos();
    var task = todos[id].replaceAt(0, "0");
    console.log(task);
    todos.splice(id, 0, task);
    todos.splice(id+1, 1);
    console.log(todos);
    localStorage.setItem('todo', JSON.stringify(todos));
    show();

    return false;
}

//if the second digit is 0 then the task is not important
function markAsImportant(){
    var id = parseInt(this.getAttribute('id'));
    var todos = get_todos();
    var task = todos[id].replaceAt(1, "1");
    console.log(task);
    todos.splice(id, 0, task);
    todos.splice(id+1, 1);
    localStorage.setItem('todo', JSON.stringify(todos));
    show();

    return false;
}

function markAsNotImportant(){
    var id = parseInt(this.getAttribute('id'));
    var todos = get_todos();
    var task = todos[id].replaceAt(1, "0");
    console.log(task);
    todos.splice(id, 0, task);
    todos.splice(id+1, 1);
    localStorage.setItem('todo', JSON.stringify(todos));
    show();

    return false;
}

function show() {
    var todos = get_todos();

    var html = '<div class="list">';
    for (var i = 0; i < todos.length; i++) {
      html += '<div class="item';
      if (todos[i].charAt(1) == '1') {
        console.log("important");
        html += ' important'; // The space must be there, so change just the "important" bit, but don't remove the space
      } else {
        console.log("not important");
      }

      if (todos[i].charAt(0) == '1') {
        console.log("done");
        html += ' done'; // The space must be there, so change just the "important" bit, but don't remove the space
      } else {
        console.log("undone");
      }

      html += '"><input type="checkbox" class="check" id="' + i + '"> ' + ' <div class="title">' + todos[i].substring(2) + '</div> <div class="tools"> <span class="tag" id="' + i + '"> <img class="important-img" src="resources/important.png"> </span> <span class="delete remove "  id="' + i + '"> <img src="resources/thrash.png"> </span> </div></div>';
    }
    html += '</div>';





    document.getElementById('todos').innerHTML = html;

    var deleteButtons = document.getElementsByClassName('remove');
    var doneButtons = document.getElementsByClassName('check');
    var importantButtons = document.getElementsByClassName('tag');
    var listItems = document.getElementsByClassName('item');




    for (var i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', remove);
    };

    for (var i=0; i < doneButtons.length; i++) {
        if (!$(listItems[i]).hasClass("done")) {
            doneButtons[i].addEventListener('click', markAsDone);
            $(doneButtons[i]).attr('checked', false);
        }
        else{
            doneButtons[i].addEventListener('click', markAsUnDone);
            $(doneButtons[i]).attr('checked', true);
        }

    };

    for (var i=0; i < importantButtons.length; i++) {
        if (!$(listItems[i]).hasClass("important")) {
            importantButtons[i].addEventListener('click', markAsImportant);
        }
        else{
            importantButtons[i].addEventListener('click', markAsNotImportant);
        }

    };

    for (var i=0; i < listItems.length; i++) {
        console.log(listItems[i]);
        $(listItems[i]).attr('id', i);
    };
}

document.getElementById('add').addEventListener('click', add);
show();



// $( ".item" ).on( "click", ".check", function() {
//     $('.check').not(this).removeClass('done');
//     $(this.parentNode).toggleClass('done');
// });

// $( ".item" ).on( "click", ".important-img", function() {
//     $('.important-img').not(this).removeClass('important');
//     $(this).closest(".item").toggleClass('important');
// });


var randNum = Math.floor((Math.random() * 34));
//Read Autors Script
function readAutors(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {

                var allText = rawFile.responseText;
                var autorsArray = allText.split('°');
                var autor = autorsArray[randNum];
                console.log(autor);
               	$("#autor-place").append(autor);

            }
        }
    }
    rawFile.send(null);
}
readAutors("quotes/autors.txt");



//Read Quotes Script
function readQuotes(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {

                var allText = rawFile.responseText;
                var quotesArray = allText.split('°');
                var quote = quotesArray[randNum];
                console.log(quote);
                $("#quote-place").append(quote);

            }
        }
    }
    rawFile.send(null);
}
readQuotes("quotes/quotes.txt");

//Read Historical Data Script
function readHistoricalData(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {

                var allText = rawFile.responseText;
                var eventsArray = allText.split('°');
                console.log(eventsArray[0])
                var randNums = [];
                var event1;
                var event2;
                var event3;

                while(randNums.length < 30){
                	var randomnumber=Math.abs(Math.ceil(Math.random()*eventsArray.length-2));
                	var found=false;
                	for(var i=0;i<randNums.length;i++){
                		if(randNums[i]==randomnumber){found=true;break}
                	}
                	if(!found)randNums[randNums.length]=randomnumber;
                }
                console.log(randNums);

                event1 = eventsArray[randNums[0]];
                event2 = eventsArray[randNums[1]];
                event3 = eventsArray[randNums[2]];

                $(".first-event p").append(event1);
                $(".second-event p").append(event2);

            }
        }
    }
    rawFile.send(null);
}



//Set Background Script
var index = 0;
index = Math.floor((Math.random() * 7) + 1);
var backgroundUrls = [
	"placeholder",
	"/backgrounds/1.jpg",
	"/backgrounds/2.jpg",
	"/backgrounds/7.jpg",
	"/backgrounds/8.jpg",
	"/backgrounds/9.jpg",
	"/backgrounds/10.jpg",
	"/backgrounds/11.jpg",
	"/backgrounds/12.jpg"
];

document.body.style.background = "url('"+ backgroundUrls[index] +"') no-repeat fixed center center / cover";



//Clock script
$(document).ready(function() {
// Create two variable with the names of the months and days in an array
var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
var dayNames= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

// Create a newDate() object
var newDate = new Date();
// Extract the current date from Date object
newDate.setDate(newDate.getDate());
// Output the day, date, month and year
$('#Date').html(dayNames[newDate.getDay()] + " " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());
//to check what historical data retrieve
var historicalDate = newDate.getDate() + ' ' + monthNames[newDate.getMonth()];
//SET CORRESPONDING HISTORICAL DATA HERE
readHistoricalData("Data/"+historicalDate);


setInterval( function() {
	// Create a newDate() object and extract the seconds of the current time on the visitor's
	var seconds = new Date().getSeconds();
	// Add a leading zero to seconds value
	$("#sec").html(( seconds < 10 ? "0" : "" ) + seconds);
	},1000);

setInterval( function() {
	// Create a newDate() object and extract the minutes of the current time on the visitor's
	var minutes = new Date().getMinutes();
	// Add a leading zero to the minutes value
	$("#min").html(( minutes < 10 ? "0" : "" ) + minutes);
    },1000);

setInterval( function() {
	// Create a newDate() object and extract the hours of the current time on the visitor's
	var hours = new Date().getHours();
	// Add a leading zero to the hours value
	$("#hours").html(( hours < 10 ? "0" : "" ) + hours);
    }, 1000);
});
