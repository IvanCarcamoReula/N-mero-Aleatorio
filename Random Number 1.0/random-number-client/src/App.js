import React, { useState } from 'react';

function App() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRandomNumber = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/random', {
        method: 'POST',
      });
      const data = await response.json();
      setRandomNumber(data.value);
    } catch (error) {
      console.error('Error fetching random number:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Generador de Números Aleatorios</h1>
      <button onClick={fetchRandomNumber} disabled={loading}>
        {loading ? 'Cargando...' : 'Generar Número Aleatorio'}
      </button>
      {randomNumber !== null && (
        <div style={{ marginTop: '20px', fontSize: '24px' }}>
          <strong>Número generado:</strong> {randomNumber}
        </div>
      )}
    </div>
  );
}

export default App;
