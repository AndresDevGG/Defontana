import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { AppState } from 'src/app/store/core/app-state.model';
import { Store } from '@ngrx/store';
import { SubsManager } from 'src/app/common/utils/subs-manager';
import { pokemonRoot } from 'src/app/store/pokemon-state/pokemon-state.root';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent extends SubsManager implements OnInit {


  constructor(private store: Store<AppState>) {
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(pokemonRoot.GET_POKEMONS());

    this.store.select(pokemonRoot.selectPokemons)
    .pipe(takeUntil(this.destroySubject))
    .subscribe(response => {
    });
  }

}
