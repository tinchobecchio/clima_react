import { useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Clima from "./components/Clima";



function App() {

  // state del formulario
  const [ busqueda, guardarBusqueda]  = useState({
    ciudad: "",
    pais: ""
  })
  const [ consultar, guardarConsultar] = useState(false);
  const [ resultado, guardarResultado] = useState({});
  
  const { ciudad, pais } = busqueda;

  useEffect(() => {
 
    const consultarAPI = async () => {
      const APIKey = '448638023d93030a4c696e838adfc109'
      
      // consultar la geolocalizacion de la ciudad
      const geo = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${APIKey}`)
      const data = await geo.json()
      const {lat, lon} = data[0]

      // consultar el clima con la lat y lon exactas de la ciudad
      const consultaClima = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`)
      const clima = await consultaClima.json()
      guardarResultado(clima)       
      
    }

    // para que no consulte si no hay nada y no consulte dos veces cuando cambia consulta por ser dependencia
    if(consultar){
      consultarAPI();
    }
    guardarConsultar(false)

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
    
                <Clima 
                  resultado={resultado}
                />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
