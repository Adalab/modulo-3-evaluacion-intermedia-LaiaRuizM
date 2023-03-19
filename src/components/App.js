/* SECCIÓN DE IMPORT */

// - De React
import { useEffect, useState } from "react";
// - Sass
import "../styles/App.scss";
// Datos
// import dataSentences from "../data/quotes.json";
import getSentenceFromApi from "../services/api";
import ls from "../services/localStorage";
// - Imágenes
import friendsImg from "../images/friendsImg.jpeg";

/* SECCIÓN DEL COMPONENTE */
function App() {
  /* VARIABLES ESTADO (DATOS) */
  // const [allQuotes, setAllQuotes] = useState(dataSentences); Because of the Fetch, I comment this variable of state and I put a new one: dataList.
  const [filterQuote, setFilterQuote] = useState("");
  const [filterCharacter, setFilterCharacter] = useState("All");
  const [newQuote, setNewQuote] = useState({
    quote: "",
    character: "",
  });
  const [dataList, setDataList] = useState(ls.get("newQuote", [])); // Because of the Fetch, I put an empty array, instead of dataSentences.
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (dataList.length === 0) {
      getSentenceFromApi().then((response) => {
        setDataList(response);
      });
    }
  }, []);

  useEffect(() => {
    ls.set("newQuote", dataList);
  }, [dataList]);

  /* FUNCIONES HANDLER */
  const handleQuoteFilter = (ev) => {
    setFilterQuote(ev.target.value);
  };

  const handleCharacterFilter = (ev) => {
    setFilterCharacter(ev.target.value);
  };

  const handleInputAdd = (ev) => {
    const inputValue = ev.target.value;
    setNewQuote({ ...newQuote, [ev.target.id]: inputValue });
  };

  const handleNewQuote = (ev) => {
    ev.preventDefault();
    // ev.target.value();
    if (newQuote.quote !== "" && newQuote.character !== "") {
      setDataList([...dataList, newQuote]);
      setNewQuote({
        quote: "",
        character: "",
      });
      setErrorMsg("");
    } else {
      setErrorMsg(
        <p className="main__form2--error">
          Please, fill the fields: The phrase and the character.
        </p>
      );
    }
  };

  /* FUNCIONES Y VARIABLES AUXILIARES PARA PINTAR EL HTML */
  const renderSentences = () => {
    return dataList //before Fetch: dataSentences
      .filter((eachSentence) => {
        return eachSentence.quote
          .toLocaleLowerCase()
          .includes(filterQuote.toLocaleLowerCase());
      })
      .filter((eachSentence) => {
        if (filterCharacter !== "All") {
          return (
            eachSentence.character.toLocaleLowerCase() ===
            filterCharacter.toLocaleLowerCase()
          );
        } else {
          return eachSentence;
        }
      })
      .map((eachSentence, idx) => (
        <li className="main__list--each" key={idx}>
          <p className="main__list--eachQuote">{eachSentence.quote} - </p>
          <p className="main__list--eachCharacter">{eachSentence.character}</p>
        </li>
      ));
  };

  /* HTML */
  return (
    <div className="App">
      <header className="header">
        <h1 className="header__title">~ Quotes of Friends🧐</h1>
        <img className="header__img" src={friendsImg} alt="logo Friends" />
      </header>
      <main className="main">
        <form className="main__form">
          <label htmlFor="quote" className="main__form--label">
            Filter by phrase:
            <input
              type="text"
              id="quote"
              placeholder="Write a word!"
              onChange={handleQuoteFilter}
              value={filterQuote}
              className="main__form--input"
            />
          </label>
          <label htmlFor="character" className="main__form--label">
            Filter by character:
            <select
              name="character"
              id="character"
              onChange={handleCharacterFilter}
              value={filterCharacter}
              className="main__form--input"
            >
              <option value="All">All characters</option>
              <option value="Ross">Ross</option>
              <option value="Monica">Monica</option>
              <option value="Joey">Joey</option>
              <option value="Phoebe">Phoebe</option>
              <option value="Chandler">Chandler</option>
              <option value="Rachel">Rachel</option>
            </select>
          </label>
        </form>
        <section>
          <ul className="main__list">{renderSentences()}</ul>
        </section>
        <form className="main__form2">
          <h2 className="main__form2--title">Add a new phrase:</h2>
          <label htmlFor="quote" className="main__form2--label">
            Phrase:
            <input
              type="text"
              id="quote"
              name="quote"
              value={newQuote.quote}
              onChange={handleInputAdd}
              className="main__form2--input"
            />
          </label>
          <label htmlFor="character" className="main__form2--label">
            Character:
            <input
              type="text"
              id="character"
              name="character"
              value={newQuote.character}
              onChange={handleInputAdd}
              className="main__form2--input"
            />
          </label>
          <input
            type="button"
            value="Click to add a new phrase"
            onClick={handleNewQuote}
            className="main__form2--button"
          />
          {errorMsg}
        </form>
      </main>
    </div>
  );
}

/* PROP-TYPES */

/* EXPORT DEL COMPONENTE */
export default App;
