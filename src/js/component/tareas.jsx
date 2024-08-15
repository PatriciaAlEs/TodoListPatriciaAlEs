import React, { useState, useEffect } from "react";
import BotonCheck from "./check";


const ListaDeTareas = () => {
    const [tarea, setTarea] = useState("");
    const [lista, setLista] = useState([]);


    const verificarUsuario = async () => {
        try {
            // Verificamos si el usuario ya existe
            const response = await fetch('https://playground.4geeks.com/todo/users/HarryPotter', {
                method: 'GET',
            });

            if (response.ok) {
                console.log('Usuario ya existe');
                return true; // Usuario ya existe
            } else if (response.status === 404) {
                console.log('Usuario no encontrado');
                return false; // Usuario no existe
            } else {
                throw new Error('Error al verificar usuario');
            }
        } catch (error) {
            console.log('Error al verificar usuario:', error);
            return false;
        }
    };


    // Función para cargar la lista de tareas desde la API (asincrona)
    const createUser = async () => {
        try {
            if (await verificarUsuario()) {
                return;
            }
            //condicion para no entrar en bucle
            const response = await fetch("https://playground.4geeks.com/todo/users/HarryPotter",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: "HarryPotter",
                    }),
                });

            if (!response.ok) {
                throw new Error("Error al crear el usuario")
            }

            // fetch(consulta) recibe como argumento la URL donde hacemos la peticion para la obtencion de datos/asincrono! promesa pendiente hasta el .then
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
        createUser()
    }, [])
    // funcion para obtener la lista de tareas al montarse el componente 


    const crearTarea = async (tarea) => {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/todos/HarryPotter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    label: tarea,
                    is_done: false
                })
            });
    
            const data = await response.json();
            console.log(data);
    
        } catch (error) {
            console.log(error);
        }
    
        setLista([...lista, tarea]); // Agrega la nueva tarea a la lista actual
        setTarea(""); // Limpia el input de tarea
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
        crearTarea(tarea);
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