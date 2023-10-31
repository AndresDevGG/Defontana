import { PokemonDto, PokemonResultDto, PokemonSpecificationDto } from 'src/app/models/pokemon-dto';

import { EvolutionDto } from 'src/app/models/evolution-dto';
import { HttpResponseType } from '../http/models/http-response-type';
import { HttpService } from '../http/http.service';
import { Injectable } from '@angular/core';
import { PokemonDetailDto } from 'src/app/models/pokemon-detail-dto';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private _base: string = 'pokemon';

  constructor(
    private _http: HttpService
  ) { }


  getAll(): HttpResponseType<PokemonResultDto> {
    return this._http.send<PokemonResultDto>('get', `${this._base}?offset=0&limit=1500`);
  }

  getById(id: string): HttpResponseType<PokemonDetailDto> {
    return this._http.send<PokemonDetailDto>('get', `${this._base}/${id}`);
  }

  getSpecification(id: string): HttpResponseType<PokemonSpecificationDto> {
    return this._http.send<PokemonSpecificationDto>('get', `${this._base}-species/${id}`);
  }

  getEvolution(id: string): HttpResponseType<EvolutionDto> {
    return this._http.send<EvolutionDto>('get', `evolution-chain/${id}`);
  }

  getNamesEvolution(evolution: EvolutionDto): Array<string> {

    let names: Array<string> = [];
    if(evolution.chain?.species.name)
      names.push(evolution.chain?.species.name);
    if(evolution.chain?.evolves_to[0]?.species.name)
      names.push(evolution.chain.evolves_to[0]?.species.name);
    if(evolution.chain?.evolves_to[0]?.evolves_to[0]?.species.name)
      names.push(evolution.chain.evolves_to[0].evolves_to[0]?.species.name);
    return names;
  }

  getImagesFromPokemons(pokemons: Array<PokemonDetailDto>): Array<PokemonDto> {
    let images: Array<PokemonDto> = [];
    pokemons.forEach(pokemon => {
      images.push({
        image: pokemon.sprites.front_default,
        name: pokemon.name
      });
    });
    return images;
  }

}
