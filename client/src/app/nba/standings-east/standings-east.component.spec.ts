import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandingsEastComponent } from './standings-east.component';

describe('StandingsEastComponent', () => {
  let component: StandingsEastComponent;
  let fixture: ComponentFixture<StandingsEastComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StandingsEastComponent]
    });
    fixture = TestBed.createComponent(StandingsEastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
