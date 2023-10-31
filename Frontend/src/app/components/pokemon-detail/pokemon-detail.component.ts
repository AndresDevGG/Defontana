import { Component, OnInit } from '@angular/core';
import { PokemonType, colorType } from 'src/app/common/utils/color-type';

import { AppState } from 'src/app/store/core/app-state.model';
import { PokemonDetailDto } from 'src/app/models/pokemon-detail-dto';
import { PokemonDto } from 'src/app/models/pokemon-dto';
import { Store } from '@ngrx/store';
import { SubsManager } from 'src/app/common/utils/subs-manager';
import { pokemonRoot } from 'src/app/store/pokemon-state/pokemon-state.root';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent extends SubsManager implements OnInit {

  public pokemon: PokemonDetailDto = null;
  public evolution: Array<PokemonDto> = [];
  public pokemonType: PokemonType = null;
  public pokemonTypes: Array<PokemonType> = [];

  public showLoading: boolean = true;

  constructor(private store: Store<AppState>) {
    super();
  }

  ngOnInit(): void {
    this.store.select(pokemonRoot.selectDetailPokemon)
    .pipe(takeUntil(this.destroySubject))
    .subscribe(result => {
      this.pokemon = result.pokemon;
      this.pokemonType = null;
      this.pokemonType = colorType(this.pokemon?.types[0]?.type?.name);
      this.pokemonTypes = [];
      this.pokemon?.types.forEach(type => {
        this.pokemonTypes.push({
          ...colorType(type.type.name),
          name: type.type.name
        });
      });
      this.evolution = result.evolution;
    });
  }

  public getPokemon(name: string): void {
    this.store.dispatch(pokemonRoot.GET_POKEMON({id: name}));
  }

}
