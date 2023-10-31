import { Component, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: '',
  template: ``,
})
export class SubsManager implements OnDestroy {
  public destroySubject: Subject<void> = new Subject();

  ngOnDestroy() {
    this.destroySubject.next();
  }
}
