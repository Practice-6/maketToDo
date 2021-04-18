// 20:30
let addTask = document.querySelector('.addTask'),
  plusAdd = document.querySelector('.plusMessage'),
  textTask = document.querySelector('.toDoTaskInput');

let toDoList = [];

if(localStorage.getItem('todo')){
  toDoList = JSON.parse(localStorage.getItem('todo'));
  displayTodoTasks();
}

plusAdd.addEventListener('click', function() {

  let newToDo = {
    todo: addTask.value,
    checked: false,
    important: false,
  };
  toDoList.push(newToDo);
  displayTodoTasks();
  addTask.value = '';

  localStorage.setItem('todo', JSON.stringify(toDoList));
});

function displayTodoTasks() {
  let displayTodoTask = '';
  if (toDoList.lenght === 0) toDoList.innerHTML = '';

  toDoList.forEach(function(item, i) {
    displayTodoTask += `
        <div class="styleTodo d-flex justify-content-start  align-items-center">
          <input type='checkbox'  id='item_${i}' ${item.checked ? 'checked' : ''} class="inputStyle">
          <label for='item_${i}' class="${item.important ? 'important' : ''}" >${item.todo}</label>
        </div>
    `;
    //  в строче 32:добавлили новый класс, который поможет удалять задачи

    // блок с задачами
    textTask.innerHTML = displayTodoTask;
  });
}


textTask.addEventListener('change', function(event){
  let idInput = event.target.getAttribute('id');
  let forLabel = textTask.querySelector('[for='+ idInput +']');
  let valueLabel = forLabel.innerHTML;

// тут мы находим id элемента, а уже из него ищем то что ввел пользователь

  toDoList.forEach(function(item){
    if(item.todo === valueLabel){
      item.checked = !item.checked
      localStorage.setItem('todo', JSON.stringify(toDoList));
      // запоминание выполненынх задач

    }
  });
});

textTask.addEventListener('contextmenu', function(event){
  event.preventDefault();
  toDoList.forEach(function(item, i){
      if(item.todo === event.target.innerHTML){
        if(event.ctrlKey || event.metaKey) {
          toDoList.splice(i, 1);
        }else{
          item.important = !item.important;
        }
        displayTodoTasks();
        localStorage.setItem('todo', JSON.stringify(toDoList));

      }
  });
});
