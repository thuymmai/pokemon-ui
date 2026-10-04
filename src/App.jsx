import { useState } from "react";
import "./App.css";
import ListPokemonComponent from "./components/ListPokemonComponent";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonComponent from "./components/PokemonComponent";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* http://localhost:8080 will direct to the main page */}
          <Route path="/" element={<ListPokemonComponent />}></Route>

          {/* http://localhost:8080/pokemons will also direct to the main page */}
          <Route path="/pokemons" element={<ListPokemonComponent />}></Route>

          {/* http://localhost:8080/add-pokemons */}
          <Route path="/add-pokemon" element={<PokemonComponent />}></Route>

          {/* http://localhost:8080/update-pokemons/1 */}
          <Route
            path="/update-pokemon/:id"
            element={<PokemonComponent />}
          ></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
