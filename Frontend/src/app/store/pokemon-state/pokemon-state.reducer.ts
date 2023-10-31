import * as Actions from "./pokemon-state.actions";

import { createReducer, on, props } from "@ngrx/store";

import { PokemonState } from "./pokemon-state.model";

const initialState: PokemonState = {
  pokemons: [],
  pokemon: null,
  idEvolution: null,
  evolution: [],
  showSpinner: false
};

export const PokemonReducer = createReducer(
  initialState,
  on(Actions.GET_POKEMONS_SUCCESS, (state, action) => ({ ...state, pokemons: action.data})),
  on(Actions.GET_POKEMON_SUCCESS, (state, action) => ({ ...state, pokemon: action.data})),
  on(Actions.GET_POKEMON_SPECIFICATION_ERROR, (state, action) => ({ ...state, idEvolution: '',evolution: []})),
  on(Actions.GET_POKEMON_EVOLUTION, (state, action) => ({ ...state, evolution: [], idEvolution: action.id})),
  on(Actions.GET_POKEMONS_FOR_EVOLUTION_SUCCESS, (state, action) => ({ ...state, evolution: action.images})),
  on(Actions.GET_POKEMONS_FOR_EVOLUTION_ERROR, (state, action) => ({ ...state, evolution: []})),
  on(Actions.SHOW_SPINNER, (state, action) => ({ ...state, show: true})),
  on(Actions.HIDE_SPINNER, (state, action) => ({ ...state, show: false}))
);
