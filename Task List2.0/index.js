'use strict';

const task = document.querySelector('.inputTask');
const btnTask = document.querySelector('.btnSend');
const totalTareas = document.querySelector('.tittle');

const displayTareas = document.querySelector('.divTarea');
const errorDiv = document.querySelector('.error');

let tasks = [];

let flagInput = false;

btnTask.addEventListener('click', function (e) {
  e.preventDefault();

  flagInput = task.value !== '' ? true : false;

  tasks = JSON.parse(localStorage.getItem('tareas'));

  if (tasks !== null && flagInput) {
    tasks.push(task.value);
    task.value = '';
    task.blur();

    localStorage.setItem('tareas', JSON.stringify(tasks));
    //updateLocal();
  } else {
    if (flagInput) {
      tasks = [task.value];
      task.value = '';
      task.blur();
      localStorage.setItem('tareas', JSON.stringify(tasks));
    } else {
      displayWarnings(errorDiv);
    }
  }
  displayTasks();
  doneBtn();
  deleteT();
});

const displayWarnings = function (element, idx) {
  element.classList.remove('hidden');

  //nuevamente
  const cancelar = document.querySelectorAll('.no');
  const siBtn = document.querySelector('.si');

  cancelar.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      element.classList.add('hidden');
    });
  });

  siBtn.addEventListener('click', function (e) {
    e.preventDefault();
    element.classList.add('hidden');
    let tareasLocal = JSON.parse(localStorage.getItem('tareas'));
    let tareasBoolean = JSON.parse(localStorage.getItem('doneT'));

    console.log(element);

    if (idx !== -1) {
      // Elimina la tarea y su estado de finalización
      tareasLocal.splice(tareasLocal.length - 1 - idx, 1); // Invertimos el índice
      if (tareasBoolean !== null) tareasBoolean.splice(idx, 1); //

      tareasBoolean.length = tareasLocal.length;

      localStorage.setItem('tareas', JSON.stringify(tareasLocal));
      localStorage.setItem('doneT', JSON.stringify(tareasBoolean));

      displayTasks();
      doneBtn();
      deleteT();
    }
  });
};

const displayTasks = function () {
  displayTareas.innerHTML = '';

  const array = JSON.parse(localStorage.getItem('tareas'));

  if (array === null || array.length === 0) {
    //Si el array es nulo mostramos un msj de alerta
    const html = `
    <label class="tarea">NO HAY TAREAS \n</label>
    `;
    displayTareas.insertAdjacentHTML('afterbegin', html);
    totalTareas.textContent = ``;
  } else {
    //si contiene elemtnos construimos el html
    //let filter = doneTasks2 !== null ? true : false;

    let doneTasks2 = JSON.parse(localStorage.getItem('doneT'));
    doneTasks2 !== null ? true : (doneTasks2 = [false]);

    doneTasks2 = doneTasks2.reverse();

    array.forEach((ele, i) => {
      let result = doneTasks2[i] === true ? 'changeColor' : '';
      const html = `
      <div class="tarea ${result}"><label>${
        i + 1
      }._ ${ele} \n</label><input class="check" type="checkbox"/> <button class="eliminar-btn">
        <i class="fas fa-trash"></i> </button> </div><br>
    `;

      displayTareas.insertAdjacentHTML('afterbegin', html);
      totalTareas.textContent = `Tasks total: ${array.length}`;
    });
  }
};

displayTasks();

let labelTareas = document.querySelectorAll('.tarea');

//PENDIENTE CHECKBOX

const doneBtn = function () {
  let checkBtn = document.querySelectorAll('.check');

  let doneTasks = JSON.parse(localStorage.getItem('doneT')) || [];

  checkBtn.forEach((btn, i) => {
    if (doneTasks[i]) {
      btn.checked = true;
    }
    btn.addEventListener('change', function (e) {
      e.preventDefault();
      doneTasks[i] = !doneTasks[i]; // Toggle el estado de la tarea

      // Toggle la clase 'changeColor' en la tarea correspondiente
      labelTareas = document.querySelectorAll('.tarea');
      checkBtn = document.querySelectorAll('.check');
      labelTareas[i].classList.toggle('changeColor', doneTasks[i]);

      localStorage.setItem('doneT', JSON.stringify(doneTasks));
    });
  });
};

doneBtn();

//console.log('Elementos con clase "check":', checkBtn);
console.log('Elementos con clase "labelTarea":', labelTareas);

let eliminarBtn = document.querySelectorAll('.eliminar-btn');
let eliminarDiv = document.querySelector('.eliminar');

const deleteT = function () {
  eliminarBtn = document.querySelectorAll('.eliminar-btn');

  eliminarBtn.forEach((btn, idx) => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      console.log(`Elimina tarea ${idx + 1}`);

      displayWarnings(eliminarDiv, idx);
    });
  });
};

deleteT();
