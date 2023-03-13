/* SECCIÓN DE IMPORT */

// - De React
// - Nuestros
// - Sass
import '../styles/App.scss';
// Datos
import data from '../data/quotes.json';
import { useState } from 'react';
// - Imágenes

/* SECCIÓN DEL COMPONENTE */
function App() {
  /* VARIABLES ESTADO (DATOS) */
  const [allQuotes, setAllQuotes] = useState(data);
  console.log(data);
  const [filterQuote, setFilterQuote] = useState('');

  /* EFECTOS (día 5) */

  /* FUNCIONES HANDLER */
  const handleQuoteFilter = (ev) => {
    setFilterQuote(ev.target.value);
  }


  /* FUNCIONES Y VARIABLES AUXILIARES PARA PINTAR EL HTML */
  // const renderSentences


  /* HTML */
  return <div className="App">
    <header>
      <h1>Frases de Friends🧐</h1>
      <form>
        <label htmlFor="quote">
          Filtrar por frase:
        <input
        type="text"
        id='quote'
        placeholder='¡Escribe una palabra!'
        onChange={handleQuoteFilter}
        // value={}
        />
        </label>
      </form>
    </header>
    <main>
      <ul>
        {}
      </ul>
    </main>
    
    
    
    
    
    {/* Aquí va el HTML */}</div>;
}

/* PROP-TYPES */

/* EXPORT DEL COMPONENTE */
export default App;
