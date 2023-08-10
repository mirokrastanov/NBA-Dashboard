import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLoaderComponent } from './profile-loader.component';

describe('ProfileLoaderComponent', () => {
  let component: ProfileLoaderComponent;
  let fixture: ComponentFixture<ProfileLoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileLoaderComponent]
    });
    fixture = TestBed.createComponent(ProfileLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
