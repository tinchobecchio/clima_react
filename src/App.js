import { useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Clima from "./components/Clima";
import Error from "./components/Error";



function App() {

  // state del formulario
  const [ busqueda, guardarBusqueda]  = useState({
    ciudad: "",
    pais: ""
  })
  const [ consultar, guardarConsultar] = useState(false);
  const [ resultado, guardarResultado] = useState({});
  const [ error, guardarError] = useState(false);
  
  const { ciudad, pais } = busqueda;

  useEffect(() => {
 
    const consultarAPI = async () => {
      const APIKey = '448638023d93030a4c696e838adfc109'
      
      // consultar la geolocalizacion de la ciudad
      const geo = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${APIKey}`)
      const data = await geo.json()

      if (data[0]) {
        const {lat, lon} = data[0]
        // consultar el clima con la lat y lon exactas de la ciudad
        const consultaClima = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`)
        const clima = await consultaClima.json()
        guardarResultado(clima)       

        // Para que muestre el cartel de error en caso de no encontrar nada
        if (clima.cod === '404') {
          guardarError(true)
        }else {
          guardarError(false)
        }
      } else {
        guardarError(true)
      }
    }

    // para que no consulte si no hay nada y no consulte dos veces cuando cambia consulta por ser dependencia
    if(consultar){
      consultarAPI();
      
    }
    guardarConsultar(false)
    // eslint-disable-next-line
  },[consultar]);

  return (
    <>
      <Header 
        titulo='Clima React App'
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario 
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar}
              />
            </div>

            <div className="col m6 s12">
              { error ? <Error mensaje="No hay resultados" /> : <Clima resultado={resultado} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
