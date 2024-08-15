import React, { useState, useEffect } from "react";
import BotonCheck from "./check";


const ListaDeTareas = () => {
    const [tarea, setTarea] = useState("");
    const [lista, setLista] = useState([]);



    // Función para cargar la lista de tareas desde la API (asincrona)
    const cargarListaDeTareas = async () => {
        try {
            if (lista.length > 0) {
                return;
            }
            //condicion para no entrar en bucle
            const response = await fetch("https://playground.4geeks.com/todo/users/Harry%20Potter")
            // fetch(consulta) recibe como argumento la URL donde hacemos la peticion para la obtencion de datos/asincrono! promesa pendiente hasta el .then
            // .then hay que añadirlo, con el .then espera y nos devuelve un valor. la peticion solo está lanzada pero sin manipular.
            const data = await response.json();
            //convertimos la respuesta en un json (o texto o lo que sea)
            console.log(data)

        } catch (error) {
            console.log(error)
        }
    }
    //try y catch es manejo de errores? 


    //esto hará que carguen las tareas al inicio porque se ejecuta obtenerTarea
    useEffect(() => {
        cargarListaDeTareas()
    }, [])
    // funcion para obtener la lista de tareas al montarse el componente 



    // Funcion para agregar una tarea a la lista
    const crearTarea = () => {

        setLista([...lista, tarea]); //...(todo lo demas)+ lista y tarea, en un nuevo array que engloba los datos de las dos variables de estado <lista, tarea>
        setTarea("")


    }

    
    //para eliminar una tarea de la lista 
    const eliminarTarea = (indexItem) => {
        setLista((prevState) => prevState.filter((_, index) => index !== indexItem))
    }


    // funcion para manejar la Tarea con la API?
    const manejarTarea = (event) => {
        setTarea(event.target.value)
    }


    const teclaAgregaNuevaTarea = (event) => {
        if (event.key === "Enter") {
            crearTarea();
        }
    }
    // funcion para al presionar que imprime un nuevo elemento en la lista



    const tareaVacia = lista == "" ? "No hay tareas, añade tu tarea" : " Introduzca otra tarea";



    if (lista)
        return (
            <div>
                <input
                    type="text"
                    placeholder={tareaVacia}
                    value={tarea}
                    // el valor es el nombre de la primera variable de estado y su valor useState("") por eso empieza vacío el input
                    onChange={manejarTarea}
                    // llamamos a la funcion manejarTarea
                    onKeyDown={teclaAgregaNuevaTarea}
                // llamamos a la funcion teclaAgregaNuevaTarea
                >
                </input>

                <ul>

                    {lista.map((cosas, index) => (
                        <li key={index} className="basurahover">{cosas}
                            {/* onClick siempre tiene un callback que seria un evento a no ser que le pasemos otro parametro dentro de la funcion (en este caso la funcion es eliminarTarea, y el parametro, (index)) */}
                            <div className="misbotones">
                                <BotonCheck />
                                <button className="btn" onClick={() => eliminarTarea(index)}>
                                    {/* //el icono de la basura va dentro del li */}

                                    <i className="fas fa-trash-alt" />
                                </button>
                            </div>
                        </li>
                    ))}

                </ul>
                <div className="cuantasTareas"> Total de tareas por hacer: {lista.length}</div>



            </div>
        )
}


export default ListaDeTareas;