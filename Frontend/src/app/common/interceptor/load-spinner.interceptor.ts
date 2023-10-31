import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';

import { AppState } from 'src/app/store/core/app-state.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { pokemonRoot } from 'src/app/store/pokemon-state/pokemon-state.root';

@Injectable()
export class LoadSpinnerInterceptor implements HttpInterceptor {

  constructor(
    private store: Store<AppState>
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.store.dispatch(pokemonRoot.SHOW_SPINNER());

    return next
      .handle(request)
      .pipe(
        finalize(this.finalize.bind(this))
      );
  }

  finalize = (): void => {
    setTimeout(() => {
      this.store.dispatch(pokemonRoot.HIDE_SPINNER())
    }, 500)
  };
}
