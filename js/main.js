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
      task.pos = roster.indexOf(task);

      listElement.appendChild(createLi(task));
   }
}

/*
   modify state of the task using the position
*/
function mutateState(pos) {
   var result;
   if(roster[pos].state === "PLAY") {
      roster[pos].state = "PAUSE";

   } else {
      roster[pos].state = "PLAY";
      
   }

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

   //create a elements
   var aExclude = createAElement(task, 'DELETE');
   var aState = createAElement(task, 'MUTATE STATE');

   //add <a>s elements in top div
   topDiv.appendChild(aExclude);
   topDiv.appendChild(aState);

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

      iAElement.setAttribute('class', 'fa fa-stop');

      aElement.appendChild(iAElement);
   } else if(func === "MUTATE STATE") {
      aElement.setAttribute('onclick', 'mutateState(' + task.pos + ')');

      if(task.state === "PLAY") {
         iAElement.setAttribute('class', 'fa fa-pause');
         aElement.setAttribute('title', 'pause');
      } else { 
         iAElement.setAttribute('class', 'fa fa-play');
         aElement.setAttribute('title', 'play');
      }
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

   saveRoster();

   render();
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