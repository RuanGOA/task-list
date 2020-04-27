var inputElement = document.querySelector('#main main input');
var buttonElement = document.querySelector('#main main button');
var listElement = document.querySelector('#main main ul');

// list of the tasks
var roster = JSON.parse(localStorage.getItem('roster')) || [];

/*
   modify the DOM
*/
function render() {
   listElement.innerHTML = '';

   for(task of roster) {
      listElement.appendChild(createLi(task));
   }
}

/*
   modify state of the task using the position
*/
function mutateState(pos, type) {
   if(type === "STATE"){
      if(roster[pos].state === "PLAY") {
         roster[pos].state = "PAUSE";

      } else {
         roster[pos].state = "PLAY";
         
      }
   } else {
      roster[pos].state = "CHECKED";

   }

   saveRoster();
   render();
}

/*
   Creates a <li> using task object
   in the roster. 
*/
function createLi(task) {
   //create top div
   var topDiv = document.createElement('div');
   topDiv.setAttribute('class', 'top');

   var aExclude = createAElement(task, 'DELETE');
   topDiv.appendChild(aExclude);
   //create a elements
   if(task.state !== "CHECKED"){
      var aState = createAElement(task, 'MUTATE STATE');
      
      var aCheck = createAElement(task, 'CHECKED');
      if(task.state === "PAUSE") {
         topDiv.style.backgroundColor = '#FF0';
         aState.style.color = '#181818';
      }
      topDiv.appendChild(aState);
      topDiv.appendChild(aCheck);
   } else {
      var iChecked = document.createElement('i');
      iChecked.setAttribute('class', 'fa fa-check');
      iChecked.style.color = '#181818';

      topDiv.appendChild(iChecked);
      topDiv.style.backgroundColor = '#5FB404';
   }
   
////

   //create bot div
   var botDiv = document.createElement('div');
   botDiv.setAttribute('class', 'bot');

   //create p element
   var pElement = document.createElement('p');
   var pText = document.createTextNode(task.text);
   pElement.appendChild(pText);

   //add p element in bot div
   botDiv.appendChild(pElement);

   //create <li> element
   var liElement = document.createElement('li');
   
   //add <p> to <li>
   liElement.appendChild(topDiv);
   liElement.appendChild(botDiv);

   return liElement;
}

/*
   create a <a> element with function and task
*/
function createAElement(task, func) {
   var aElement = document.createElement('a');
   aElement.setAttribute('href', '#');

   var iAElement = document.createElement('i');

   if(func === "DELETE") {
      aElement.setAttribute('onclick', 'deleteTodo(' + task.pos + ')');
      aElement.setAttribute('title', 'exclude');

      iAElement.setAttribute('class', 'fa fa-times-circle');

      aElement.appendChild(iAElement);
      aElement.style.color = '#F00';
   } else if(func === "MUTATE STATE") {
      aElement.setAttribute('onclick', 'mutateState(' + task.pos + ',"STATE")');

      if(task.state === "PLAY") {
         iAElement.setAttribute('class', 'fa fa-pause-circle');
         aElement.setAttribute('title', 'pause');
      } else { 
         iAElement.setAttribute('class', 'fa fa-play-circle');
         aElement.setAttribute('title', 'play');   
      } 

      aElement.style.color = '#FF0';
   } else if(func === "CHECKED") {
      aElement.setAttribute('onclick', 'mutateState(' + task.pos + ',"CHECK")');

      iAElement.setAttribute('class', 'fa fa-check-circle');
      aElement.setAttribute('title', 'check task');
      aElement.style.color = '#5FB404';
   }

   aElement.appendChild(iAElement);

   return aElement;
}

/*
   add todo text in the roster
*/
function addTodo() {
   var todoText = inputElement.value;
   //verify empty value
   if(todoText.trim() != ''){
      var task = new Object();
      task.state = "PAUSE";
      task.text = todoText;

      roster.push(task);
      task.pos = roster.indexOf(task);

      inputElement.value = '';

      saveRoster();
  
      render();
   }
}

/*
   delete todo text
*/
function deleteTodo(pos) {
   roster.splice(pos, 1);

   reposition();

   saveRoster();

   render();
}

/*
   reposition the elements after a delete
*/
function reposition() {
   for(task of roster) {
      task.pos = roster.indexOf(task);
   }
}

/* 
   save the roster 
   in the localStorage
*/
function saveRoster() {
   localStorage.setItem('roster', JSON.stringify(roster));
}

/*
   activate button.onclick() with -enter
*/
inputElement.addEventListener("keyup", function(event) {
   if (event.keyCode === 13) {
      buttonElement.click();
   }
});

buttonElement.onclick = addTodo;

render();