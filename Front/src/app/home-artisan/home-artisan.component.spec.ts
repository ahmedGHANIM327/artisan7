import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeArtisanComponent } from './home-artisan.component';

describe('HomeArtisanComponent', () => {
  let component: HomeArtisanComponent;
  let fixture: ComponentFixture<HomeArtisanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeArtisanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeArtisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
