import * as PokemonActions from './pokemon-state.actions'

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, forkJoin, lastValueFrom, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { finished, inProcess, inQueue } from 'src/app/common/utils/actions-proccess';

import { AppState } from '../core/app-state.model';
import { Injectable } from '@angular/core';
import { PokemonDto } from 'src/app/models/pokemon-dto';
import { PokemonService } from './../../services/pokemon/pokemon.service';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class PokemonEffects {

  private _idEvolutionStore: string = '';

  constructor(
    private actions$: Actions,
    private pokemonService: PokemonService,
    private store: Store<AppState>
  ) {
    this.store.select(x => x.pokemonState.idEvolution)
    .subscribe(id => this._idEvolutionStore = id);
  }

  getPokemonsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PokemonActions.GET_POKEMONS),
      tap((action) => inQueue(action.type)),
      mergeMap((action) => {
        inProcess(action.type);
        return this.pokemonService.getAll()
        .pipe(
          map(response => {
            if (response) {
              return PokemonActions.GET_POKEMONS_SUCCESS({data: response.results})
            } else {
              return PokemonActions.GET_POKEMONS_ERROR()
            }
          }),
          catchError(error => of(PokemonActions.GET_POKEMONS_ERROR())),
          tap((action) => finished(action.type))
        );
      })
    );
  });

  getPokemonByIdEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PokemonActions.GET_POKEMON),
      tap((action) => inQueue(action.type)),
      mergeMap((action) => {
        inProcess(action.type);
        return this.pokemonService.getById(action.id)
        .pipe(
          mergeMap(response => {
            if (response) {
              return [PokemonActions.GET_POKEMON_SUCCESS({data: response}), PokemonActions.GET_POKEMON_SPECIFICATION({id: action.id})]
            } else {
              return [PokemonActions.GET_POKEMON_ERROR()]
            }
          }),
          catchError(error => of(PokemonActions.GET_POKEMON_ERROR())),
          tap(() => finished(action.type))
        );
      })
    );
  });

  getPokemonSpecificationsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PokemonActions.GET_POKEMON_SPECIFICATION),
      tap((action) => inQueue(action.type)),
      mergeMap((action) => {
        inProcess(action.type);
        return this.pokemonService.getSpecification(action.id)
        .pipe(
          mergeMap(response => {
            if (response) {
              const url = response.evolution_chain.url;
              const arrUrl = url.split('/');
              const id = arrUrl[arrUrl.length - 2];
              if (id !== this._idEvolutionStore) {
                return [PokemonActions.GET_POKEMON_SPECIFICATION_SUCCESS({data: response}), PokemonActions.GET_POKEMON_EVOLUTION({id})]
              } else {
                return [PokemonActions.GET_POKEMON_SPECIFICATION_SUCCESS({data: response})]
              }


              return [PokemonActions.GET_POKEMON_SPECIFICATION_SUCCESS({data: response}), PokemonActions.GET_POKEMON_EVOLUTION({id})]
            } else {
              return [PokemonActions.GET_POKEMON_SPECIFICATION_ERROR()]
            }
          }),
          catchError(error => of(PokemonActions.GET_POKEMON_SPECIFICATION_ERROR())),
          tap(() => finished(action.type))
        );
      })
    );
  });

  getPokemonEvolutionEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PokemonActions.GET_POKEMON_EVOLUTION),
      tap((action) => inQueue(action.type)),
      mergeMap((action) => {
        inProcess(action.type);
        return this.pokemonService.getEvolution(action.id)
        .pipe(
          mergeMap(response => {
            const pokemons = this.pokemonService.getNamesEvolution(response)
            if (response) {
              return [PokemonActions.GET_POKEMON_EVOLUTION_SUCCESS({data: response}),PokemonActions.GET_POKEMONS_FOR_EVOLUTION({pokemons})]
            } else {
              return [PokemonActions.GET_POKEMON_EVOLUTION_ERROR()]
            }
          }),
          catchError(error => of(PokemonActions.GET_POKEMON_EVOLUTION_ERROR())),
          tap(() => finished(action.type))
        );
      })
    );
  });

  efectoConArreglo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.GET_POKEMONS_FOR_EVOLUTION),
      tap((action) => inQueue(action.type)),
      switchMap((action) => {
        const arreglo = action.pokemons;
        const observables = arreglo.map((str) => this.pokemonService.getById(str));

        return forkJoin(observables).pipe(
          map((resultados) => {
            const images = this.pokemonService.getImagesFromPokemons(resultados);
            finished(action.type)
            return PokemonActions.GET_POKEMONS_FOR_EVOLUTION_SUCCESS({images});
          })
        );
      }),
      catchError(error => of(PokemonActions.GET_POKEMONS_FOR_EVOLUTION_ERROR())),

  )
);



}
