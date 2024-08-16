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
            return response.ok;
        } catch (error) {
            console.log(error);
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
                });
            const data = await response.json();
            console.log(data)

        } catch (error) {
            console.log(error)
        }
    }


    const obtenerArrayApi = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/users/HarryPotter")
            const data = await response.json();
            setLista(data.todos);
            console.log(data.todos)
        } catch (error) {
            console.log(error);
            setLista([]);
        }
    };


    useEffect(() => {
        createUser()
        obtenerArrayApi()
    }, [])


    const crearTarea = async () => {
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

            if (response.ok) {
                const data = await response.json();
                setLista(prevList => [...prevList, data]);
            } else {
                console.error("Error al agregar la tarea");
            }

        } catch (error) {
            console.log(error);
        }

        setTarea(""); // Limpia el input de tarea
    }


    const eliminarTarea = (indexItem) => {
        setLista((prevState) => prevState.filter((_, index) => index !== indexItem))
    }


    const manejarTarea = (event) => {
        setTarea(event.target.value)
    }


    const teclaAgregaNuevaTarea = (event) => {
        if (event.key === "Enter") {
            crearTarea();
        }
    }


    const tareaVacia = lista == "" ? "No hay tareas, añade tu tarea" : " Introduzca otra tarea";


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

                {lista.map((cosas) => (
                    <li key={cosas.id} className="basurahover">{cosas.label}
                        {/* onClick siempre tiene un callback que seria un evento a no ser que le pasemos otro parametro dentro de la funcion (en este caso la funcion es eliminarTarea, y el parametro, (index)) */}
                        <div className="misbotones">
                            <BotonCheck />
                            <button className="btn" onClick={() => eliminarTarea(cosas.id)}>
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