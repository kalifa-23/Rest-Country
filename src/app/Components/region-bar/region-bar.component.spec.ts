import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionBarComponent } from './region-bar.component';

describe('RegionBarComponent', () => {
  let component: RegionBarComponent;
  let fixture: ComponentFixture<RegionBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegionBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
