import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarLoaderComponent } from './star-loader.component';

describe('StarLoaderComponent', () => {
  let component: StarLoaderComponent;
  let fixture: ComponentFixture<StarLoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StarLoaderComponent]
    });
    fixture = TestBed.createComponent(StarLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
