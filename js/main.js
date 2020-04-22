var inputElement = document.querySelector('#main main input');
var buttonElement = document.querySelector('#main main button');
var listElement = document.querySelector('#main main ul');

var roster = [];

function render() {
   listElement.innerHTML = '';

   for(todo of roster) {
      var pos = roster.indexOf(todo);

      listElement.appendChild(createLi(todo, pos));
   }
}

render();

function createLi(text, pos) {
   //create <a> element
   var aElement = document.createElement('a');
   aElement.setAttribute('href', '#');
   aElement.setAttribute('onclick', 'deleteTodo(' + pos + ')');
   //create <a> text
   String.fromCodePoint(0x1F621)
   var aText = document
      .createTextNode('  ' +
         String.fromCodePoint(0x274C)
      );
   //fin. <a>
   aElement.appendChild(aText);

   //create <p> element
   var pElement = document.createElement('p');
   //create text of <p>
   var pText = document.createTextNode(text);
   //fin. <p>
   pElement.appendChild(pText);

   //add <a> to <p>
   pElement.appendChild(aElement);

   //create <li> element
   var liElement = document.createElement('li');
   
   //add <p> to <li>
   liElement.appendChild(pElement);

   return liElement;
}

function addTodo() {
   var todoText = inputElement.value;

   roster.push(todoText);
   inputElement.value = '';

   render();
}

buttonElement.onclick = addTodo;

function deleteTodo(pos) {
   roster.splice(pos, 1);
   render();
}

inputElement.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        buttonElement.click();
    }
});