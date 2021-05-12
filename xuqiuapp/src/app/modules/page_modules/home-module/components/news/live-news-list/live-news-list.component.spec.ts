import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveNewsListComponent } from './live-news-list.component';

describe('LiveNewsListComponent', () => {
  let component: LiveNewsListComponent;
  let fixture: ComponentFixture<LiveNewsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveNewsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveNewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
