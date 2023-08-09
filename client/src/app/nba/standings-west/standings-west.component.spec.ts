import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandingsWestComponent } from './standings-west.component';

describe('StandingsWestComponent', () => {
  let component: StandingsWestComponent;
  let fixture: ComponentFixture<StandingsWestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StandingsWestComponent]
    });
    fixture = TestBed.createComponent(StandingsWestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
