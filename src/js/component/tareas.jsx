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
            const data = await response.json();
            console.log('Usuario creado exitosamente:', data);
            getListTask();
        } catch (error) {
            console.error('algo está fallando:', error);
        }
    }


    const getListTask = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/users/HarryPotter");
            if (!response.ok) {
                await createUser(); // Espera a que el usuario sea creado
                return // Sale de la función
            }
            
            //si la respuesta es ok, entonces sigue con el código
            const data = await response.json();
            setLista(data.todos);
             console.log(data.todos);
        } catch (error) {
            console.log('Error:', error);
        }
        
    };



    const crearTarea = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/todos/HarryPotter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    label: tarea,
                    is_done: false,
                }),
            });

            await response.json();
            await getListTask(); // Espera a que la lista se actualice
            setTarea("");
        } catch (error) {
            console.log('Error:', error);
        }
        console.log(tarea);
        
    };

    
    const eliminarTarea = async (id) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                },
            });   
            setLista((prevState) => prevState.filter((tarea) => tarea.id !== id));
    
            console.log(`Tarea con id ${id} eliminada JEJEJEJ.`);
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
            console.log('Todas las tareas han sido eliminadas exitosamente.');
            setLista([]);
            await createUser();  
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
