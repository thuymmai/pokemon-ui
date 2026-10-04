import React, { useEffect } from "react";
import { useState } from "react";
import { getAllPokemons } from "../services/PokemonService";
import { useNavigate } from "react-router-dom";

const ListPokemonComponent = () => {
  const [pokemons, setPokemons] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    listPokemons();
  }, []);

  function listPokemons() {
    getAllPokemons()
      .then((response) => {
        setPokemons(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addNewPokemon() {
    navigate("/add-pokemon");
  }

  function updatePokemon(id) {
    console.log(id);

    {
      /* pass the dynamic id */
    }
    navigate(`/update-pokemon/${id}`);
  }

  return (
    <div className="container">
      <h2 className="text-center">Pokemon List</h2>
      <button className="btn btn-primary mb-2" onClick={addNewPokemon}>
        Add a Pokemon
      </button>
      <div>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Pokemon Name</th>
              <th>Description</th>
              <th>Final Evolution</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pokemons.map((pokemon) => (
              <tr key={pokemon.id}>
                <td>{pokemon.name}</td>
                <td>{pokemon.description}</td>
                <td>{pokemon.final_evolution ? "Yes" : "No"}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => updatePokemon(pokemon.id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListPokemonComponent;
