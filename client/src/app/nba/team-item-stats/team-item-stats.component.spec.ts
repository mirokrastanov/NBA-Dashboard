import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamItemStatsComponent } from './team-item-stats.component';

describe('TeamItemStatsComponent', () => {
  let component: TeamItemStatsComponent;
  let fixture: ComponentFixture<TeamItemStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamItemStatsComponent]
    });
    fixture = TestBed.createComponent(TeamItemStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
