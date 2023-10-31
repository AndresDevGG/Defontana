import {
  GET_POKEMON,
  GET_POKEMONS,
  GET_POKEMONS_ERROR,
  GET_POKEMONS_SUCCESS,
  GET_POKEMON_ERROR,
  GET_POKEMON_SUCCESS,
  HIDE_SPINNER,
  SHOW_SPINNER
} from './pokemon-state.actions'
import { selectDetailPokemon, selectEvolution, selectPokemon, selectPokemons, selectSpinner } from './pokemon-state.selects';

import { PokemonEffects } from './pokemon-state.effects';
import { PokemonReducer } from './pokemon-state.reducer';

export const pokemonRoot = {
  GET_POKEMONS,
  GET_POKEMON,
  SHOW_SPINNER,
  HIDE_SPINNER,
  PokemonReducer,
  PokemonEffects,
  selectPokemons,
  selectPokemon,
  selectEvolution,
  selectDetailPokemon,
  selectSpinner
};
