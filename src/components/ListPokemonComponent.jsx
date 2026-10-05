import React, { useEffect } from "react";
import { useState } from "react";
import {
  getAllPokemons,
  deletePokemon,
  isFinalEvolution,
  isNotFinalEvolution,
} from "../services/PokemonService";
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

  // after user deletes a pokemon, the user should navigate to List of Pokemons page
  function removePokemon(id) {
    deletePokemon(id)
      .then((response) => {
        listPokemons();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function markFinalEvolutionPokemon(id) {
    isFinalEvolution(id)
      .then((response) => {
        listPokemons();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function markNotFinalEvolutionPokemon(id) {
    isNotFinalEvolution(id)
      .then((response) => {
        listPokemons();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container">
      <h2 className="text-center">Pokemon List</h2>
      <button className="btn btn-primary mb-2" onClick={addNewPokemon}>
        Add a Pokemon
      </button>
      <div className="table-responsive-sm">
        <table className="table table-bordered table-striped table-hover">
          <caption>Pokédex</caption>
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
                  <div className="action-buttons">
                    <button
                      className="btn btn-info"
                      onClick={() => updatePokemon(pokemon.id)}
                    >
                      Update
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() => removePokemon(pokemon.id)}
                      style={{ marginLeft: "10px" }}
                    >
                      Delete
                    </button>

                    <button
                      className="btn btn-outline-light"
                      onClick={() =>
                        pokemon.final_evolution
                          ? markNotFinalEvolutionPokemon(pokemon.id)
                          : markFinalEvolutionPokemon(pokemon.id)
                      }
                      style={{ marginLeft: "10px" }}
                    >
                      Final Evolution
                    </button>
                  </div>
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
