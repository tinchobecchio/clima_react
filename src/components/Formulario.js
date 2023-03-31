import { useState } from "react";

const Formulario = () => {
    // state del formulario
    const [ busqueda, guardarBusqueda]  = useState({
        ciudad: "",
        pais: ""
    })
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
    }


    return ( 
        <form
            onSubmit={handleSubmit}
        >
            {error ? <p className="red darken-4 error">Todos los campos son obligatorios</p> : null}
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

            <div className="input-field col s12">

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
 
export default Formulario;