import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerDialogComponent } from './supprimer-dialog.component';

describe('SupprimerDialogComponent', () => {
  let component: SupprimerDialogComponent;
  let fixture: ComponentFixture<SupprimerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupprimerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupprimerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
