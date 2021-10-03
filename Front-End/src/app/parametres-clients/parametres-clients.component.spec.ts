import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametresClientsComponent } from './parametres-clients.component';

describe('ParametresClientsComponent', () => {
  let component: ParametresClientsComponent;
  let fixture: ComponentFixture<ParametresClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametresClientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametresClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
