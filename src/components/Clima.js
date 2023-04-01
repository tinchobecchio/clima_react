import PropTypes from 'prop-types';

const Clima = ({resultado}) => {
    
    const {name, main} = resultado
    if(!name) return null

    // Grados Kelvin
    const kelvin = 273.15



    return (
        <div className="card-panel white col s12">
            <div className="black-text">
                <h2>Temperatura actual en {name}:</h2>
                <p className="temperatura">
                    {parseFloat(main.temp - kelvin, 10).toFixed(2)}<span>&#x2103;</span>
                </p>
                <p>Sensación térmica: {parseFloat(main.feels_like - kelvin, 10).toFixed(2)}<span>&#x2103;</span></p>
                <p>Humedad: {main.humidity}%</p>
            </div>
        </div>
        
    );
}
 
Clima.propTypes = {
    resultado: PropTypes.object.isRequired
}
export default Clima;