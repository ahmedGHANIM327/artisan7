import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiographieDialogComponent } from './biographie-dialog.component';

describe('BiographieDialogComponent', () => {
  let component: BiographieDialogComponent;
  let fixture: ComponentFixture<BiographieDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiographieDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BiographieDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
