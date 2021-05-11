import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotStockListComponent } from './hot-stock-list.component';

describe('HotStockListComponent', () => {
  let component: HotStockListComponent;
  let fixture: ComponentFixture<HotStockListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotStockListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotStockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
