import axios from "axios";

const BASE_REST_API_URL = "http://localhost:8080/api/pokemons";

/* export function getAllPokemons() {
  return axios.get(BASE_REST_API_URL);
} */

export const getAllPokemons = () => {
  return axios.get(BASE_REST_API_URL);
};

// to send POST request
// pass pokemon object as parameter to the savePokemon function
export const savePokemon = (pokemon) => axios.post(BASE_REST_API_URL, pokemon);

// Get Pokemons REST API
export const getPokemon = (id) => axios.get(BASE_REST_API_URL + "/" + id);

// Update Pokemons REST API
export const updatePokemon = (id, pokemon) =>
  axios.put(BASE_REST_API_URL + "/" + id, pokemon);

// Delete Pokemons REST API
export const deletePokemon = (id) => axios.delete(BASE_REST_API_URL + "/" + id);

// Check whether the Pokemon is in its final evolution form
// YES, it is in its final evolution form
export const isFinalEvolution = (id) =>
  axios.patch(BASE_REST_API_URL + "/" + id + "/final-evolution");

export const isNotFinalEvolution = (id) =>
  axios.patch(BASE_REST_API_URL + "/" + id + "/not-final-evolution");
