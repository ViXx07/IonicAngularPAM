import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminSisGuardGuard } from './admin-sis-guard.guard';

describe('adminSisGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminSisGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
