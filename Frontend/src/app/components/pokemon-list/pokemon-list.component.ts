import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, merge, of, takeUntil } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

import { AppState } from 'src/app/store/core/app-state.model';
import { MatPaginator } from '@angular/material/paginator';
import { PokemonDto } from 'src/app/models/pokemon-dto';
import { Store } from '@ngrx/store';
import { SubsManager } from 'src/app/common/utils/subs-manager';
import { cloneDeep } from 'src/app/common/utils/clone-deep';
import { pokemonRoot } from 'src/app/store/pokemon-state/pokemon-state.root';
import {MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent extends SubsManager implements OnInit {

  public pokemons: Array<PokemonDto> = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<PokemonDto> = new MatTableDataSource<PokemonDto>(this.pokemons);

  constructor(
    private store: Store<AppState>,
    private changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Pokemons por página';
    this.store.select(pokemonRoot.selectPokemons)
    .pipe(takeUntil(this.destroySubject))
    .subscribe(results => {
      this.pokemons = cloneDeep(results);
      this.dataSource = new MatTableDataSource<PokemonDto>(this.pokemons);
      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
    });


  }

  public filterResults(value: string): void {

    if (value === '') {
      this.dataSource = new MatTableDataSource<PokemonDto>(this.pokemons);
      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
    } else {
      const filterPokemons = this.pokemons.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );

      const firstPokemon = filterPokemons[0].name;
      this.getPokemon(firstPokemon);

      this.dataSource = new MatTableDataSource<PokemonDto>(filterPokemons);
      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
    }
  }

  public getPokemon(name: string): void {
    // const id = url.slice(url.length-2,-1)
    this.store.dispatch(pokemonRoot.GET_POKEMON({id: name}));
  }

  override ngOnDestroy() {
    this.destroySubject.next();
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }
}
