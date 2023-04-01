import PropTypes from 'prop-types';
import { useState } from "react";
import Error from "./Error";

const Formulario = ({busqueda,guardarBusqueda,guardarConsultar}) => {

    const [error, guardarError ] = useState(false)

    // extraer ciudad y pais
    const { ciudad, pais } = busqueda;

    // funcion que coloca los elementos en el state
    const handleChange = (e) => {
        guardarBusqueda({
          ...busqueda,
            [e.target.name]: e.target.value
        })
    }

    // Cuando el usuario da submit al form
    const handleSubmit = e => {
        e.preventDefault()

        //validar
        if(ciudad.trim() === '' || pais.trim() === '') {
            guardarError(true)
            return
        }
        guardarError(false)
        //pasarlo al componente princpal
        guardarConsultar(true)
    }


    return ( 
        <form
            onSubmit={handleSubmit}
        >
            {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
            <div className="input-field col s12">
                <input 
                    type="text" 
                    name="ciudad"
                    id="ciudad"
                    value={ciudad}
                    onChange={handleChange}
                />
                <label htmlFor="ciudad">Ciudad: </label>
            </div>

            <div className="input-field col s12 este">

                <select
                    className="browser-default"
                    name="pais"
                    id="pais"
                    value={pais}
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione un país --</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>

                </select>

                <label htmlFor="pais">Pais: </label>

            </div>
            <div className="input-field col s12">
                <button
                    type="submit"
                    value='Buscar Clima'
                    className="waves-effect waves-light btn-large btn-block #00897b teal darken-1"
                >Buscar Clima</button>
            </div>

        </form>
     );
}

Formulario.propTypes = {
    busqueda: PropTypes.object.isRequired,
    guardarBusqueda: PropTypes.func.isRequired,
    guardarConsultar: PropTypes.func.isRequired
}
export default Formulario;