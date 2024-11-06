import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminEmpGuardGuard } from './admin-emp-guard.guard';

describe('adminEmpGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminEmpGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});