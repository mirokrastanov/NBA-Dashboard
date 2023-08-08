import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamItemRosterComponent } from './team-item-roster.component';

describe('TeamItemRosterComponent', () => {
  let component: TeamItemRosterComponent;
  let fixture: ComponentFixture<TeamItemRosterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamItemRosterComponent]
    });
    fixture = TestBed.createComponent(TeamItemRosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
