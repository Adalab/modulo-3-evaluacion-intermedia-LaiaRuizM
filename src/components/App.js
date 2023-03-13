/* SECCIÓN DE IMPORT */

// - De React
// - Nuestros
// - Sass
import '../styles/App.scss';
// Datos
import dataSentences from '../data/quotes.json';
import { useState } from 'react';
// - Imágenes

/* SECCIÓN DEL COMPONENTE */
function App() {
  /* VARIABLES ESTADO (DATOS) */
  const [allQuotes, setAllQuotes] = useState(dataSentences);
  const [filterQuote, setFilterQuote] = useState('');
  const [filterCharacter, setFilterCharacter] = useState('Todos');

  /* EFECTOS (día 5) */

  /* FUNCIONES HANDLER */
  const handleQuoteFilter = (ev) => {
    setFilterQuote(ev.target.value);
  }

  const handleCharacterFilter = (ev) => {
    setFilterCharacter(ev.target.value);
  }

  /* FUNCIONES Y VARIABLES AUXILIARES PARA PINTAR EL HTML */
  const renderSentences = () => {
    return dataSentences
    .filter((eachSentence) => {
      return (eachSentence.quote.toLocaleLowerCase().includes(filterQuote.toLocaleLowerCase()))
    })
    .filter((eachSentence) => {
      if(filterCharacter !== 'Todos'){
        return (eachSentence.character.toLocaleLowerCase()===(filterCharacter.toLocaleLowerCase()))
    }else{
      return eachSentence;
    }  
    })
    .map((eachSentence, idx) => (
    <li className='listLi' key={idx}>
      <p className='listLi--quote'>{eachSentence.quote} - </p>
      <p className='listLi--name'>{eachSentence.character}</p>
    </li>
  ))
}

  /* HTML */
  return <div className="App">
    <header>
      <h1>Frases de Friends🧐</h1>
      <form>
        <label htmlFor="quote">
          Filtrar por frase:
        <input
        type="text"
        id="quote"
        placeholder='¡Escribe una palabra!'
        onChange={handleQuoteFilter}
        value={filterQuote}
        />
        </label>
        <label htmlFor="character">
          Filtrar por personaje:
        <select name="character" id="character" onChange={handleCharacterFilter}>
          <option value="Todos">Todos</option>
          <option value="Ross">Ross</option>
          <option value="Monica">Monica</option>
          <option value="Joey">Joey</option>
          <option value="Phoebe">Phoebe</option>
          <option value="Chandler">Chandler</option>
          <option value="Rachel">Rachel</option>
        </select>
        </label>
      </form>
    </header>
    <main>
      <ul>
        {renderSentences()}
      </ul>
    </main>
    
  </div>;  
    
    
    
    
    {/* Aquí va el HTML */}
    
}

/* PROP-TYPES */

/* EXPORT DEL COMPONENTE */
export default App;
