import React, { useState, useEffect } from "react";
import BotonCheck from "./check";


const ListaDeTareas = () => {
    const [tarea, setTarea] = useState("");
    const [lista, setLista] = useState([]);



    const createUser = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/users/HarryPotter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error('No se pudo crear el usuario.');
            }
            const data = await response.json();
            console.log('Usuario creado exitosamente:', data);
            getListTask();
        } catch (error) {
            console.error('Error:', error);
        }
    }


    const getListTask = () => {
        fetch("https://playground.4geeks.com/todo/users/HarryPotter")
            .then((response) => {
                if (!response.ok) {
                    createUser();
                    throw new Error('No se pudo obtener la lista de tareas.');
                }
                return response.json();
            })
            .then((data) => {
                setLista(data.todos);
            })
            .catch((error) => {
                console.log('Error:', error);
            });
    };



    const crearTarea = () => {
        fetch("https://playground.4geeks.com/todo/todos/HarryPotter", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                label: tarea,
                is_done: false,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                getListTask();
                setTarea("");
            })
            .catch((error) => {
                console.log('Error:', error);
            });
            console.log(tarea)
            console.log(lista)
    };

    
    const eliminarTarea = async (id) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log(response);
    
            if (!response.ok) {
                throw new Error('No se pudo eliminar la tarea');
            }
    
            setLista((prevState) => prevState.filter((tarea) => tarea.id !== id));
    
            console.log(`Tarea con id ${id} eliminada exitosamente.`);
        } catch (error) {
            console.error('Hubo un problema con la eliminación:', error);
        }
    };
    
    const eliminarTodasTareas = async () => {
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/users/HarryPotter`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (!response.ok) {
                throw new Error('No se pudo eliminar la tarea');
            }
    
            setLista([]);
            createUser();
    
            console.log('Todas las tareas han sido eliminadas exitosamente.');
        } catch (error) {
            console.error('Hubo un problema con la eliminación:', error);
        }
    };

    const tareaVacia = lista == "" ? "No hay tareas, añade tu tarea" : " Introduzca otra tarea";
                    


    useEffect(() => {
        getListTask(); 
    }, []);



    return (
        <div>
            <input
                type="text"
                placeholder={tareaVacia}
                value={tarea}
                onChange={(e) => setTarea(e.target.value)}
                onKeyDown={(e) => {if (e.key === "Enter") crearTarea()}}
        
            />

            <ul>
                {lista.map((tarea) => (
                    <li key={tarea.id} className="basurahover">
                        {tarea.label}
                        <div className="misbotones">
                            <BotonCheck />
                            <button className="btn" onClick={() => eliminarTarea(tarea.id)}>
                                <i className="fas fa-trash-alt" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="cuantasTareas">Total de tareas por hacer: {lista.length}</div>
        <div className="botonBorrarToDo">

            <button className="btn" onClick={() => eliminarTodasTareas()}>
                Borrar todas las tareas
            </button>

        </div>
        </div>
    );
};

export default ListaDeTareas;
