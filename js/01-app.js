function listeners(){
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            mensajeNuevo();
        }
    })
    document.addEventListener('DOMContentLoaded', cargarMensajes)
}

const contenido = document.querySelector('.contenido')
const input = document.createElement('input')
const mensajes = document.createElement('p')

function adecuacionHTML(){
    mensajes.setAttribute('class', 'mensajes')
    input.setAttribute('class', 'usuario')
    input.setAttribute('placeholder', 'Escribe tu mensaje')
    contenido.appendChild(input)
    contenido.appendChild(mensajes)

}

adecuacionHTML()
listeners()

function mensajeNuevo() {
    const mensaje = input
.value.trim();
    if (mensaje === '') return 

    const historialMensajes = JSON.parse(localStorage.getItem('mensajes')) || []
    historialMensajes.push(mensaje)
    localStorage.setItem('mensajes', JSON.stringify(historialMensajes))
    input.value = ''

    cargarMensajes()
}


function cargarMensajes() {
    const historialMensajes = JSON.parse(localStorage.getItem('mensajes')) || []
    mensajes.innerHTML = ''

    historialMensajes.forEach((mensaje, index) => {
        const mensajeIndividual = document.createElement('div')
        mensajeIndividual.textContent = mensaje
        mensajeIndividual.setAttribute('data-index', index)

        const botonEliminar = document.createElement('button')
        botonEliminar.textContent = 'Eliminar'
        botonEliminar.addEventListener('click', () => borrarMensaje(index))

        mensajeIndividual.appendChild(botonEliminar)
        mensajes.appendChild(mensajeIndividual)

    })
}


function borrarMensaje(index) {
    const historialMensajes = JSON.parse(localStorage.getItem('mensajes')) || []
    historialMensajes.splice(index, 1); // Elimina el mensaje en el índice dado
    localStorage.setItem('mensajes', JSON.stringify(historialMensajes))
    
    cargarMensajes()
}