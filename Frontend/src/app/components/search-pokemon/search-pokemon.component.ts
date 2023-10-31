import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { AppState } from 'src/app/store/core/app-state.model';
import { PokemonDto } from 'src/app/models/pokemon-dto';
import { Store } from '@ngrx/store';
import { SubsManager } from 'src/app/common/utils/subs-manager';
import { cloneDeep } from 'src/app/common/utils/clone-deep';
import { pokemonRoot } from 'src/app/store/pokemon-state/pokemon-state.root';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styleUrls: ['./search-pokemon.component.scss']
})
export class SearchPokemonComponent extends SubsManager implements OnInit {
  public pokemons: Array<PokemonDto> = [];
  public filterPokemons: Array<PokemonDto> = [];
  public searchTerm: string = '';

  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private store: Store<AppState>
  ) {
    super();
  }

  ngOnInit(): void {
    this.store.select(pokemonRoot.selectPokemons)
    .pipe(takeUntil(this.destroySubject))
    .subscribe(results => {
      this.pokemons = cloneDeep(results);
    });
  }

  public clean(): void {
    setTimeout(() => {
      this.filterPokemons = [];
    }, 200);

    if (this.searchTerm === '') {
      this.eventSearch();
    }
  }

  public filterItems(): void {
    if(this.searchTerm === '')
      this.filterPokemons = [];
    else
      this.filterPokemons = this.pokemons.filter(item =>
        item.name.toLowerCase().includes(this.searchTerm.trim().toLowerCase())
      );
  }

  public formatName(text: string): string {
    if (!this.searchTerm) {
      return text;
    }

    return text.replace(new RegExp(this.searchTerm, 'gi'), match => `<strong>${match}</strong>`);
  }

  public selectedItem(name: string): void {
    this.searchTerm = name;
    this.filterPokemons = [];
    this.eventSearch();
  }

  public eventSearch(): void {
    this.onSearch.emit(this.searchTerm);
  }

}
