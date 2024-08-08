import React, { useState } from "react";
import ListaDeTareas from "./tareas";



//create your first component
const Home = () => {
	return (
		<div className="container text-center">
					<h1 className="nota text-center pt-5 mt-5"> NOTAS </h1>
			<div className="lista-tareas">
		
					<ListaDeTareas />

			</div>
		</div>
	);
};

export default Home;
