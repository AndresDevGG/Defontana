import { PokemonDto, PokemonSpecificationDto } from 'src/app/models/pokemon-dto';
import { createAction, props } from '@ngrx/store';

import { EvolutionDto } from 'src/app/models/evolution-dto';
import { PokemonDetailDto } from 'src/app/models/pokemon-detail-dto';

const GET_POKEMONS = createAction('[POKEMON] Get Pokemons');
const GET_POKEMONS_SUCCESS = createAction('[POKEMON] Get Pokemons Success', props<{data: Array<PokemonDto>}>());
const GET_POKEMONS_ERROR = createAction('[POKEMON] Get Pokemons Error');

const GET_POKEMON = createAction('[POKEMON] Get Pokemon', props<{id: string}>());
const GET_POKEMON_SUCCESS = createAction('[POKEMON] Get Pokemon Success', props<{data: PokemonDetailDto}>());
const GET_POKEMON_ERROR = createAction('[POKEMON] Get Pokemon Error');

const GET_POKEMON_SPECIFICATION = createAction('[POKEMON] Get Pokemon Specification', props<{id: string}>());
const GET_POKEMON_SPECIFICATION_SUCCESS = createAction('[POKEMON] Get Pokemon Specification Success', props<{data: PokemonSpecificationDto}>());
const GET_POKEMON_SPECIFICATION_ERROR = createAction('[POKEMON] Get Pokemon Specification Error');

const GET_POKEMON_EVOLUTION = createAction('[POKEMON] Get Pokemon Evolution', props<{id: string}>());
const GET_POKEMON_EVOLUTION_SUCCESS = createAction('[POKEMON] Get Pokemon Evolution Success', props<{data: EvolutionDto}>());
const GET_POKEMON_EVOLUTION_ERROR = createAction('[POKEMON] Get Pokemon Evolution Error');

const GET_POKEMONS_FOR_EVOLUTION = createAction('[POKEMON] Get Pokemon for evolution', props<{pokemons: Array<string>}>());
const GET_POKEMONS_FOR_EVOLUTION_SUCCESS = createAction('[POKEMON] Get Pokemon for evolution Success', props<{images: Array<PokemonDto>}>());
const GET_POKEMONS_FOR_EVOLUTION_ERROR = createAction('[POKEMON] Get Pokemon for evolution Error');

const SHOW_SPINNER = createAction('[SPINNER] Show Spinner');
const HIDE_SPINNER = createAction('[SPINNER] Hide Spinner');


export {
  GET_POKEMONS,
  GET_POKEMONS_SUCCESS,
  GET_POKEMONS_ERROR,
  GET_POKEMON,
  GET_POKEMON_SUCCESS,
  GET_POKEMON_ERROR,
  GET_POKEMON_SPECIFICATION,
  GET_POKEMON_SPECIFICATION_SUCCESS,
  GET_POKEMON_SPECIFICATION_ERROR,
  GET_POKEMON_EVOLUTION,
  GET_POKEMON_EVOLUTION_SUCCESS,
  GET_POKEMON_EVOLUTION_ERROR,
  GET_POKEMONS_FOR_EVOLUTION,
  GET_POKEMONS_FOR_EVOLUTION_SUCCESS,
  GET_POKEMONS_FOR_EVOLUTION_ERROR,
  SHOW_SPINNER,
  HIDE_SPINNER
};
