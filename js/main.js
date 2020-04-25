var inputElement = document.querySelector('#main main input');
var buttonElement = document.querySelector('#main main button');
var listElement = document.querySelector('#main main ul');

var roster = JSON.parse(localStorage.getItem('roster')) || [];

function render() {
   listElement.innerHTML = '';

   for(task of roster) {
      task.pos = roster.indexOf(task);

      listElement.appendChild(createLi(task));
   }
}

render();

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
   //create <a> element for exclude task
   var aExclude = createAElement(task, 'DELETE');

   //create <a> element for mutate state of the task
   var aState = createAElement(task, 'MUTATE STATE');

   //create <p> element
   var pElement = document.createElement('p');
   //create text of <p>
   var pText = document.createTextNode(task.text);
   pElement.appendChild(pText);

   //add <a>s to <p>
   pElement.appendChild(aExclude);
   pElement.appendChild(aState);

   //create <li> element
   var liElement = document.createElement('li');
   
   //add <p> to <li>
   liElement.appendChild(pElement);

   return liElement;
}

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

function deleteTodo(pos) {
   roster.splice(pos, 1);

   saveRoster();

   render();
}

//save the roster in the localStorage
function saveRoster() {
   localStorage.setItem('roster', JSON.stringify(roster));
}

//activate button.onclick() with -enter
inputElement.addEventListener("keyup", function(event) {
   if (event.keyCode === 13) {
      buttonElement.click();
   }
});

buttonElement.onclick = addTodo;

//create a <a> element with function and task
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