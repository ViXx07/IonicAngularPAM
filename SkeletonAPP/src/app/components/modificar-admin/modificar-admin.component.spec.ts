import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of } from 'rxjs';
import { FirebaseConfigService } from 'src/app/services/fireBaseConfig/firebase-config.service';

describe('FirebaseConfig', () => {
  let service: FirebaseConfigService;

  const mockAngularFireAuth: any = {
    authState: of(null),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        service,
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
      ],
    });
    service = TestBed.inject(FirebaseConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
