import React, { useState } from "react";
import BotonCheck from "./check";

const ListaDeTareas = () => {
    const [Tarea, setTarea] = useState("");
    const [Lista, setLista] = useState([]);


    const addProductsToList = () => {
        setLista([...Lista, Tarea]); //esto debería de funcionar
        setTarea("")
        console.log("product added", Lista)
    };

    const tareaVacia = Lista == "" ? "No hay tareas, añade tu tarea" : " Introduzca otra tarea";


    const agregarValorInput = (event) => {
        setTarea(event.target.value)
    }
    // funcion para agregar elemento a la lista 


    const presionarTeclaNuevoInput = (event) => {
        if (event.key === "Enter") {
            addProductsToList();
        }
    }
    // funcion para al presionar que imprimi un nuevo elemento en la lista



    const deleteItems = (indexItem) => {
        setLista((prevState) => prevState.filter((_, index) => index !== indexItem))
    }

    return (
        <div>
            <input
                type="text"
                placeholder={tareaVacia}

                value={Tarea}
                // el valor es el nombre de la primera variable de estado y su valor useState("") por eso empieza vacío el input

                onChange={agregarValorInput}
                // llamamos a la funcion agregarValorInput
                onKeyDown={presionarTeclaNuevoInput}
            // llamamos a la funcion presionarTeclaNuevoImput
            >

            </input>

            <ul>

                {Lista.map((cosas, index) => (
                    <li key={index} className="basurahover">{cosas}
                        {/* onClick siempre tiene un callback que seria un evento a no ser que le pasemos otro parametro dentro de la funcion (en este caso la funcion es deleteItems, y el parametro, (index)) */}
                        <div className="misbotones">
                            <BotonCheck />
                            <button className="btn" onClick={() => deleteItems(index)}>
                                {/* //el icono de la basura va dentro del li */}

                                <i className="fas fa-trash-alt" />
                            </button>
                        </div>
                    </li>
                ))}

            </ul>
            <div className="cuantasTareas"> Total de tareas por hacer: {Lista.length}</div>

        </div>
    )
}


export default ListaDeTareas;