import React, { useState } from "react";

const ListaDeTareas = () => {
    const [Tarea, setTarea] = useState("");
    const [Lista, setLista] = useState([]);

    const addProductsToList = () => {
        setLista([...Lista, Tarea]); //esto debería de funcionar
        setTarea("")
        console.log("product added", Lista)
    };

    const agregarValorInput = (event) => {
        setTarea(event.target.value)
    }
// funcion para agregar elemento a la lista 

    const presionarTeclaNuevoInput = (event) => {
        if (event.key === "Enter") {
            addProductsToList();
        }
    }
// funcion para al presionar que se cree un nuevo elemento en la lista



    const deleteItems = (indexItem) => {
        setLista((prevState) => prevState.filter(( _ , index) => index !== indexItem)) 
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Añade tu tarea"
                value={Tarea}
                onChange={agregarValorInput}
                onKeyDown={presionarTeclaNuevoInput}
            >
            </input>
            <ul>
                {Lista.map((cosas, index) => (
                    <li key={index}>{cosas} 

                    <button className="btn" onClick={() => deleteItems(index)}>
            <i className="fas fa-trash-alt" />
          </button>
                    
                     </li>
                ))}



</ul>


        </div>
    )
}


export default ListaDeTareas;