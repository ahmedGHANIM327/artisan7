import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisArtisanComponent } from './devis-artisan.component';

describe('DevisArtisanComponent', () => {
  let component: DevisArtisanComponent;
  let fixture: ComponentFixture<DevisArtisanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevisArtisanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevisArtisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
