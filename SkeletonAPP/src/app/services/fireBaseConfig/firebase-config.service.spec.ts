import { TestBed } from '@angular/core/testing';
import { FirebaseConfigService } from '../fireBaseConfig/firebase-config.service';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';
import { UtilsService } from '../utils/utils.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GoogleAuthService } from '../googleAuth/google-auth.service';

describe('FirebaseConfigService', () => {
  let service: FirebaseConfigService;
  let utilsService: UtilsService;
      
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig), 
      ],
      providers: [
        FirebaseConfigService,
        UtilsService,
        AngularFirestore,
        AngularFireAuth,
        GoogleAuthService
      ]
    });
    service = TestBed.inject(FirebaseConfigService);
    utilsService = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
