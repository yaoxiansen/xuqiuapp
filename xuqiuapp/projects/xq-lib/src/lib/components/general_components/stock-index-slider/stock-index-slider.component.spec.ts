import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockIndexSliderComponent } from './stock-index-slider.component';

describe('StockIndexSliderComponent', () => {
  let component: StockIndexSliderComponent;
  let fixture: ComponentFixture<StockIndexSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockIndexSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockIndexSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
