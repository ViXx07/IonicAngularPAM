import { GoogleAuthService } from './google-auth.service';
import { FirebaseConfigService } from '../fireBaseConfig/firebase-config.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';
import { IonicModule } from '@ionic/angular';

describe('GoogleAuthService', () => {
  let service: GoogleAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
      ],
      providers: [
        GoogleAuthService,
        FirebaseConfigService,
        AngularFireAuth,
      ],
    });
    service = TestBed.inject(GoogleAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});



