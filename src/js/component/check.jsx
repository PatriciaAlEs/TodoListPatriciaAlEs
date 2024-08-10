import React, { useState } from "react";

const BotonCheck = () => {

    const [botonCheck, setBotonCheck] = useState(false)

    const muestraElCheck = () => {
        setBotonCheck(!botonCheck)
    }


    return (
        <div className="input-container">
            <input
                className="checkboton"
                type="checkbox"
                value=""
                onClick={muestraElCheck}
            />
        </div>

    )
}




export default BotonCheck