import { TestBed } from '@angular/core/testing';

import { TechGuardService } from './tech-guard.service';

describe('TechGuardService', () => {
  let service: TechGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
