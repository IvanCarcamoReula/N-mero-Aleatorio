import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import './App.css';

function App() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [loading, setLoading] = useState(false);
  const [animationKey, setAnimationKey] = useState(0); // Estado para la clave de la animación

  const fetchRandomNumber = async () => {
    setLoading(true); // Establecer el estado de carga a true

    try {
      const response = await fetch('http://localhost:3000/random', {
        method: 'POST',
      });
      const data = await response.json();
      const number = data.value;

      // Actualiza el número y cambia la clave después de un breve retraso
      setTimeout(() => {
        setRandomNumber(number);
        setAnimationKey(prevKey => prevKey + 1); // Cambia la clave para reiniciar la animación
      }, 20); // Ajustar si es necesario
    } catch (error) {
      console.error('Error fetching random number:', error);
      setRandomNumber(null); // Reinicia el número en caso de error
    } finally {
      // Asegúrate de que el loading se desactive después de recibir el número o en caso de error
      setLoading(false);
    }
  };

  // Animación para el número generado
  const props = useSpring({
    opacity: randomNumber !== null ? 1 : 0,
    transform: randomNumber !== null ? 'scale(1)' : 'scale(0.5)',
    config: { duration: 500 }, // Ajusta la duración si es necesario
    reset: true,
    // La clave de animación cambia con el estado animationKey
    // Esto reinicia la animación
  });

  useEffect(() => {
    // Si randomNumber cambia, la animación debería reiniciarse
    if (randomNumber !== null) {
      setAnimationKey(prevKey => prevKey + 1);
    }
  }, [randomNumber]);

  return (
    <div className="app-container">
      <h1>Generador de Números Aleatorios</h1>
      <button onClick={fetchRandomNumber} disabled={loading}>
        {loading ? 'Cargando...' : 'Generar Número Aleatorio'}
      </button>

      <div className="number-container">
        {randomNumber !== null && (
          <animated.div
            className="number-display"
            style={props}
            key={animationKey} // Forzar la actualización del componente animado
          >
            {randomNumber}
          </animated.div>
        )}
      </div>
    </div>
  );
}

export default App;
