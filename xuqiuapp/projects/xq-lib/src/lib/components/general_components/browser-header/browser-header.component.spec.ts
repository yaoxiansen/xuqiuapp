import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserHeaderComponent } from './browser-header.component';

describe('BrowserHeaderComponent', () => {
  let component: BrowserHeaderComponent;
  let fixture: ComponentFixture<BrowserHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowserHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
