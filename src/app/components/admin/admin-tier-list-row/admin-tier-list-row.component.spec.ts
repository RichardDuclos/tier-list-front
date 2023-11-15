import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTierListRowComponent } from './admin-tier-list-row.component';

describe('AdminTierListRowComponent', () => {
  let component: AdminTierListRowComponent;
  let fixture: ComponentFixture<AdminTierListRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminTierListRowComponent]
    });
    fixture = TestBed.createComponent(AdminTierListRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
