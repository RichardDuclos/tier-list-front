import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityTableComponent } from './entity-table.component';

describe('EntityFormComponent', () => {
  let component: EntityTableComponent;
  let fixture: ComponentFixture<EntityTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntityTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntityTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
