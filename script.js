class Tarea {
    constructor(nombre, descripcion) {
        this.nombre = nombre
        this.descripcion = descripcion
    }


}

let tareas = []

if(localStorage.getItem('tareas')) {  //si existe lo consulto
    tareas = JSON.parse(localStorage.getItem('tareas'))
} else { // sino lo creo
    localStorage.setItem('tareas', JSON.stringify(tareas))
}

const formTareas = document.getElementById("formTareas")
const divTareas = document.getElementById("divTareas")
const botonTareas = document.getElementById("botonTareas")

formTareas.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(e.target)   
    let datForm = new FormData(e.target)

    let tarea = new Tarea(datForm.get('nombre'), datForm.get('descripcion'))

    tareas.push(tarea) //agrego nuevo objeto al final del array
    console.log(tareas)

    localStorage.setItem('tareas', JSON.stringify(tareas)) 
    formTareas.reset()
})

botonTareas.addEventListener('click', () => {
    let arrayStorage = JSON.parse(localStorage.getItem('tareas')) //las paso de json a objetos
    divTareas.innerHTML = ""
    arrayStorage.forEach((tarea, indice) => { //primer parametro objeto, segundo indice

        divTareas.innerHTML += `
        <div class="card border-dark mb-3" id="tarea${indice}" style="max-width: 20rem; margin:4px;">
            <div class="card-header"><h2>${tarea.nombre}</h2></div>
            <div class="card-body">
                <p class="card-title">${tarea.descripcion}</p>
                <button class="btn btn-danger">Eliminar Tarea</button>
            </div>
        </div>

        `
    })

    arrayStorage.forEach((tarea, indice) => {
        let botonCard = document.getElementById(`tarea${indice}`).lastElementChild.lastElementChild
        botonCard.addEventListener('click', () => {
            document.getElementById(`tarea${indice}`).remove() //elimino del DOM
            tareas.splice(indice,1) //elimino del array
            localStorage.setItem('tareas', JSON.stringify(tareas))
            console.log(`${tarea.nombre} Eliminada`)
        })
    })
})