import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TierListDetailsComponent } from './tier-list-details.component';

describe('TierListDetailsComponent', () => {
  let component: TierListDetailsComponent;
  let fixture: ComponentFixture<TierListDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TierListDetailsComponent]
    });
    fixture = TestBed.createComponent(TierListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
