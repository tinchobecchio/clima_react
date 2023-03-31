const Formulario = () => {
    return ( 
        <form>
            <div className="input-field col s12">
                <input 
                    type="text" 
                    name="ciudad"
                    id="ciudad"
                />
                <label htmlFor="ciudad">Ciudad: </label>
            </div>

            <div className="input-field col s12">

                <select
                    className="browser-default"
                    name="pais"
                    id="pais"
                >
                    <option value="">-- Seleccione un país --</option>
                    <option value="Argentina">Argentina</option>

                </select>

                <label htmlFor="pais">Pais: </label>

            </div>

        </form>
     );
}
 
export default Formulario;