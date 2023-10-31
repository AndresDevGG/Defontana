import { Component, OnInit } from '@angular/core';

import { AppState } from './store/core/app-state.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Store } from '@ngrx/store';
import { pokemonRoot } from './store/pokemon-state/pokemon-state.root';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Frontend';

  constructor(
    private spinner: NgxSpinnerService,
    private store: Store<AppState>,
  ) {}

  ngOnInit(): void {

    this.store
    .select(pokemonRoot.selectSpinner)
    .subscribe(showSpinner => {
      if (showSpinner) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    });
  }
}
