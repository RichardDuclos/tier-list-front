import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TierlistListRowComponent } from './tierlist-list-row.component';

describe('TierlistListRowComponent', () => {
  let component: TierlistListRowComponent;
  let fixture: ComponentFixture<TierlistListRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TierlistListRowComponent]
    });
    fixture = TestBed.createComponent(TierlistListRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
