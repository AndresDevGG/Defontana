import { PokemonDetailDto } from "src/app/models/pokemon-detail-dto";
import { PokemonDto } from "src/app/models/pokemon-dto";
import { PokemonState } from "./pokemon-state.model";
import { createSelector } from "@ngrx/store";

const getPokemons = (state: PokemonState): Array<PokemonDto> => state.pokemons;
const getPokemon = (state: PokemonState): PokemonDetailDto => state.pokemon;
const getEvolution = (state: PokemonState): Array<PokemonDto> => state.evolution;
const getSpinnerInfo = (state: PokemonState): boolean => state.showSpinner;

const selectPokemons = createSelector((state: { pokemonState: PokemonState }) => state.pokemonState, getPokemons);
const selectPokemon = createSelector((state: { pokemonState: PokemonState }) => state.pokemonState, getPokemon);
const selectEvolution = createSelector((state: { pokemonState: PokemonState }) => state.pokemonState, getEvolution);
const selectSpinner = createSelector((state: { pokemonState: PokemonState }) => state.pokemonState, getSpinnerInfo);

const selectDetailPokemon =  createSelector(
  selectPokemon,
  selectEvolution,
  (pokemon, evolution) => {
    return {
      pokemon,
      evolution,
    };
  }
);

export { selectPokemons, selectPokemon, selectEvolution, selectDetailPokemon, selectSpinner};
