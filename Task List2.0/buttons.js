'use strict';

const btnOrdenAlfabetico = document.querySelector('.ordenAlfabetico');
const btnFirstTask = document.querySelector('.firstTask');
const btnLastTask = document.querySelector('.lastTask');

let flag = false;

btnOrdenAlfabetico.addEventListener('click', function (e) {
  e.preventDefault();

  flag = !flag;

  if (flag) {
    const arrayTask = JSON.parse(localStorage.getItem('tareas'));
    let result = filterTask(arrayTask);
    actualizarDisplay(result);
    console.log(result);
  } else {
    displayTasks();
  }
  doneBtn();
  deleteT();
});

const filterTask = function (array) {
  let arrayAux = array;
  if (arrayAux !== null || arrayAux == []) {
    arrayAux.sort();
  }
  return arrayAux;
};

const actualizarDisplay = function (array) {
  displayTareas.innerHTML = '';

  array.forEach((ele, i) => {
    let doneTasks2 = JSON.parse(localStorage.getItem('doneT'));
    doneTasks2 !== null ? true : (doneTasks2 = [false]);

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
  doneBtn();
  deleteT();
};

let flag2 = false;

btnFirstTask.addEventListener('click', function (e) {
  e.preventDefault();

  flag2 = true;

  if (flag2) {
    const arrayTask = JSON.parse(localStorage.getItem('tareas'));
    let result = mayorMenor(arrayTask, 0);
    actualizarDisplay(result);
    console.log(result);
  } else {
    displayTasks();
  }
  doneBtn();
  deleteT();
});

const mayorMenor = function (array, num) {
  let arrayAux = array;
  if (num === 0) {
    arrayAux.sort((a, b) => arrayAux.indexOf(a) - arrayAux.indexOf(b));
  }
  if (num === 1) {
    arrayAux.sort((a, b) => arrayAux.indexOf(b) - arrayAux.indexOf(a));
  }
  return arrayAux;
};

let flag3 = false;

btnLastTask.addEventListener('click', function (e) {
  e.preventDefault();

  flag3 = !flag3;

  if (flag3) {
    const arrayTask = JSON.parse(localStorage.getItem('tareas'));

    let result = mayorMenor(arrayTask, 1);
    actualizarDisplay(result);
  } else {
    displayTasks();
  }
  doneBtn();
  deleteT();
});

const deleteAll = document.querySelector('.deleteAll');
const divDeleteAll = document.querySelector('.eliminarAll');

deleteAll.addEventListener('click', e => {
  e.preventDefault();

  //const check = JSON.parse(localStorage.getItem('tareas'));

  divDeleteAll.classList.remove('hidden');

  const siBtnAll = document.querySelector('.siAll');
  const noBtnAll = document.querySelector('.noAll');

  noBtnAll.addEventListener('click', e => {
    e.preventDefault();
    divDeleteAll.classList.add('hidden');
  });

  siBtnAll.addEventListener('click', e => {
    e.preventDefault();
    // Assuming you have a key named 'myKey' that you want to remove
    localStorage.removeItem('tareas');
    localStorage.removeItem('doneT');
    divDeleteAll.classList.add('hidden');
    displayTasks();
  });
});
