const boton = document.getElementById("save");  //Creamos una constante para obtener el elemento del boton en este caso mediante un ID
const datos = document.getElementById("load");
var listaTareas = document.querySelector('#lista');
var formulario = document.getElementById('TAREAS');

array = [] //Creamos un array para guardar las tareas añadidas


formulario.addEventListener('submit', function obtenerValor() { //Se crea un EventListener con para indicar que va a pasar una vez que demos click
    const input = document.getElementById("cajatxt"); // Creamos una constante para obtener el elemento donde escribimos mediante su ID
    if(input.value != null){ // Se hace una condicion diciendo que si el valor del input es distinto de null haga 
        const task = input.value; // haga que ese valor escrito sea igual a otra constante
        addTask(task); // Añadimos el valor mediante la constante igualada a la funcion "addTask"
//--------------------------------------------------------------------------
        var datas = new FormData(formulario);
        //console.log(datas.get('cajatask'));

        fetch('txt.php',{
            method: 'POST',
            body: datas
        })
            .then(resultado => resultado.json())
            .then(datos => {
                console.log(datos);
            })

//-----------------------------------------------------------------------------------
        
    }   
    //Guardamos en el localStorage mediate la clave "valor" todo lo que se encuentre en el array "array"
    localStorage.setItem("valor", JSON.stringify(array)); 

});

const addTask = (tarea) =>{ //Creamos la funcion addTask añadiendole un parametro 
    
    array.push(tarea);  // Mandamos a llamar al array junto con ".push" y entre parentesis el parametro añadido para agregar la tarea al array
    array.forEach(tarea2 => console.log(tarea2));
    //console.log(array); // Un console log para volcar el contenido sobre la consola

}

const obtenervalueArray = () =>{ //Funcion para obtener el valor del array
    
    //Obtenemos los valores del localStorage para mediante la funcion "forEach"
    //ir añadiendo cada uno al array y queden ordenados
    JSON.parse(localStorage.getItem("valor")).forEach(function (local){
        array.push(local);
    })
}

obtenervalueArray(); //linea 21

imprimirLocalStorage(); //linea 40

function imprimirLocalStorage(){

    //Creamos un fragmento para ir almacenando un nuevo documento
    //cada vez que se agregue una tarea
    let fragment = new DocumentFragment(); 

    //Mediante la funcion "forEach" vamos creando un elemento nuevo "li"
    //para cada elemento del array y lo vamos añadiendo al fragmento
    //para ir almacenadno los documentos
    array.forEach(function (tareas) {
    
        const button = document.createElement("button");
    
        const li = document.createElement("li");
        li.innerHTML = tareas;
    
        //Aggregamos estilos a los elementos creados
        li.style.marginTop = "10px";
        li.style.background = "rgb(29, 28, 28)";
        li.style.width = "250px";
        li.style.height = "30px";
        li.style.marginLeft = "300px";
        li.style.borderColor = "red";
        li.style.borderWidth = "0px";

        button.style.marginLeft = "30px";
        button.style.background = "rgb(29, 28, 28)";
        button.style.color = "white"
        button.style.height = "20px";
        button.style.width = "62px";
        button.style.borderColor = "red";
        button.textContent = "Eliminar";
        //Almacenamos el documento agregandole los elementos 
        //creados 
        fragment.appendChild(li).appendChild(button);

        //un evento para que se elimine la tarea una vez haciendo click en el boton
        button.addEventListener("click", function eliminarAppendChild(){
            //Agarramos el indice de la tarea seleccionada para eliminarla
            const index = array.indexOf(tareas);
            if (index > -1) {
                array.splice(index, 1);
              }
              //Actualizamos localStorage con la tarea eliminada
            localStorage.setItem("valor", JSON.stringify(array));
            //creamos una varibale para poder remover el documento de la lista
            aux = fragment.appendChild(li).appendChild(button);
            //movemos el documento de la lista con el valor asignado
            listaTareas.removeChild(aux);      

        })
    })
    //Mandamos a llamar a la lista y le añadimos los documentos
    listaTareas.appendChild(fragment);

} 


function deleteLocalStorage(){

    const del = document.getElementById("delete");
    
    //Indicamos que limpie el localStorage cada vez que se da click
    // en el boton "Eliminar Tareas"
    del.addEventListener('click', function eliminar(){
    
        localStorage.clear(); //Vaciamos el LocalStorage
        array = []; //Vaciamos el array 
        listaTareas.remove(); // Quitamos la lista

    });        
}
        

deleteLocalStorage(); //Linea 106


function mostrarInfo(info){

    if(info){
        console.log('Adding Task');
    } else {
        console.log('Type a task');
    }

}