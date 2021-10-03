import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandesArtisanComponent } from './demandes-artisan.component';

describe('DemandesArtisanComponent', () => {
  let component: DemandesArtisanComponent;
  let fixture: ComponentFixture<DemandesArtisanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandesArtisanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandesArtisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
