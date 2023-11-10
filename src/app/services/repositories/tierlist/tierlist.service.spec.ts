import { TestBed } from '@angular/core/testing';

import { TierlistService } from './tierlist.service';

describe('TierlistService', () => {
  let service: TierlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TierlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
