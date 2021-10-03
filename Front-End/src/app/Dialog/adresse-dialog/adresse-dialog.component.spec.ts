import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdresseDialogComponent } from './adresse-dialog.component';

describe('AdresseDialogComponent', () => {
  let component: AdresseDialogComponent;
  let fixture: ComponentFixture<AdresseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdresseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdresseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
