import React, { useState } from "react";

const BotonCheck = () => {

    const [botonCheck, setBotonCheck] = useState(false)


    return (
        <div className="input-container">
            <input
                className="checkboton"
                type="checkbox"
                onClick={()=> setBotonCheck(!botonCheck)}
                //los onLoQueSea siempre devuelven callback, esto es un callback -> {()=> "lafunciondelestado(!loContrarioALaVariableDelEstado)"}
            />
        </div>

    )
}




export default BotonCheck