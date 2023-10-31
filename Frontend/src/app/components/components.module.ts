import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonResumeComponent } from './pokemon-resume/pokemon-resume.component';
import { SearchPokemonComponent } from './search-pokemon/search-pokemon.component';
import { SummaryComponent } from './summary/summary.component';

@NgModule({
  declarations: [
    PokemonDetailComponent,
    PokemonListComponent,
    PokemonResumeComponent,
    SearchPokemonComponent,
    SummaryComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    PokemonDetailComponent,
    PokemonListComponent,
    PokemonResumeComponent,
    SearchPokemonComponent,
    SummaryComponent
  ]
})
export class ComponentsModule { }
