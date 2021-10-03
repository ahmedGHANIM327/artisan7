import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecteurDialogComponent } from './secteur-dialog.component';

describe('SecteurDialogComponent', () => {
  let component: SecteurDialogComponent;
  let fixture: ComponentFixture<SecteurDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecteurDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecteurDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
