import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametresArtisanComponent } from './parametres-artisan.component';

describe('ParametresArtisanComponent', () => {
  let component: ParametresArtisanComponent;
  let fixture: ComponentFixture<ParametresArtisanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametresArtisanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametresArtisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
