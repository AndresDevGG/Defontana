import { Component, OnInit } from '@angular/core';

import { AppState } from 'src/app/store/core/app-state.model';
import { PokemonDto } from 'src/app/models/pokemon-dto';
import { Store } from '@ngrx/store';
import { SubsManager } from 'src/app/common/utils/subs-manager';
import { cloneDeep } from 'src/app/common/utils/clone-deep';
import { pokemonRoot } from 'src/app/store/pokemon-state/pokemon-state.root';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent extends SubsManager implements OnInit  {
  public pokemons: Array<PokemonDto> = [];
  public summary: Map<string, number> = new Map<string, number>();
  constructor(
    private store: Store<AppState>) {
    super();
  }

  ngOnInit(): void {
    this.store.select(pokemonRoot.selectPokemons)
    .pipe(takeUntil(this.destroySubject))
    .subscribe(results => {
      this.pokemons = cloneDeep(results);
      this.setResume();
    });
  }

  public setResume(): void {
    this.pokemons.forEach((pokemon) => {
        if (pokemon.name.length > 0) {
            const firstLetter = pokemon.name.charAt(0).toUpperCase();

            if (/[A-Z]/.test(firstLetter)) {
                if (this.summary.has(firstLetter)) {
                    this.summary.set(firstLetter, this.summary.get(firstLetter)! + 1);
                } else {
                    this.summary.set(firstLetter, 1);
                }
            }
        }
    });
    this.summary = new Map([...this.summary.entries()].sort());
  }

}
