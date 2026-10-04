import React, { useState, useEffect } from "react";
import {
  savePokemon,
  getPokemon,
  updatePokemon,
} from "../services/PokemonService";
import { useNavigate, useParams } from "react-router-dom";

const PokemonComponent = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [final_evolution, setFinalEvolution] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // create a JavaScript function to handle onClick event (form submit)
  function saveOrUpdatePokemon(e) {
    // this function prevents any default actions
    // that is happening while submitting this form
    e.preventDefault();

    const pokemon = { name, description, final_evolution };
    console.log(pokemon);

    if (id) {
      updatePokemon(id, pokemon)
        .then((response) => {
          navigate("/pokemons");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // when user submits the form, then user should navigate to the List Pokemon page. That's why I use useNavigate hook to navigate to the List Pokemon page after submitting the form. But I will implement this later after I implement the List Pokemon page.
      savePokemon(pokemon)
        .then((response) => {
          // print response of data to console
          console.log(response.data);
          navigate("/pokemons");
        })
        .catch((error) => {
          console.error(error); // pass the error object
        });
    }
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update the Pokemon</h2>;
    } else {
      return <h2 className="text-center">Add a Pokemon</h2>;
    }
  }

  useEffect(() => {
    if (id) {
      getPokemon(id)
        .then((response) => {
          console.log(response.data);
          setName(response.data.name);
          setDescription(response.data.description);
          setFinalEvolution(response.data.final_evolution);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  return (
    <div className="container">
      <br />
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <br /> <br />
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Pokemon name:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter a name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Description:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter a description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></input>
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Final evolution:</label>
                <select
                  className="form-control"
                  value={final_evolution}
                  onChange={(e) => setFinalEvolution(e.target.value)}
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
              <br />

              <button
                className="btn btn-success"
                onClick={(e) => saveOrUpdatePokemon(e)}
              >
                Submit
              </button>
            </form>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
};

export default PokemonComponent;
