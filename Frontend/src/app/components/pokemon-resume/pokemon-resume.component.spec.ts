import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonResumeComponent } from './pokemon-resume.component';

describe('PokemonResumeComponent', () => {
  let component: PokemonResumeComponent;
  let fixture: ComponentFixture<PokemonResumeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonResumeComponent]
    });
    fixture = TestBed.createComponent(PokemonResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
