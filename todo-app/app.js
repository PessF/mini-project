// Selectors
const todoForm = document.querySelector('form');
const todoInput = document.querySelector('#todo-input');
const todoListUl = document.querySelector('#todo-list');
let allTodos = [];

// Add Todo
const addTodo = () => {
  const todoText = todoInput.value.trim();
  if (todoText.length > 0) { // แก้จาก lenghth เป็น length
    const todoObject = {
      text: todoText,
      completed: false
    };
    allTodos.push(todoObject);
    todoInput.value = '';
    updateTodoList(); // แสดงรายการหลังเพิ่ม
  }
};

// Submit Form
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addTodo();
});

// Create Todo Item
const createTodoItem = (todoObject, todoIndex) => {
  const todoId = "todo-" + todoIndex;

  const todoItem = document.createElement('li');
  todoItem.className = 'todo-item';
  todoItem.innerHTML = `
    <input type="checkbox" id="${todoId}" ${todoObject.completed ? 'checked' : ''}>
    <label for="${todoId}" class="todo-text">${todoObject.text}</label>
    <button class="delete-button">
      <span class="delete-icon material-symbols-outlined">close</span>
    </button>
  `;

  // Toggle completed
  const checkbox = todoItem.querySelector('input[type="checkbox"]');
  checkbox.addEventListener('change', () => {
    allTodos[todoIndex].completed = checkbox.checked;
    displayRemainingTodos();
  });

  // Delete item
  const deleteButton = todoItem.querySelector('.delete-button');
  deleteButton.addEventListener('click', () => {
    allTodos.splice(todoIndex, 1);
    updateTodoList();
    displayRemainingTodos();
  });

  return todoItem;
};

// Update Todo List
const updateTodoList = () => {
  todoListUl.innerHTML = '';
  allTodos.forEach((todo, index) => {
    const todoItem = createTodoItem(todo, index);
    todoListUl.appendChild(todoItem);
  });
  displayRemainingTodos();
};

// Display Remaining Todos
const displayRemainingTodos = () => {
  const remainingCount = allTodos.filter(todo => !todo.completed).length;
  document.querySelector('.remaining-todo').textContent = `Your remaining to-dos: ${remainingCount}`;
};
