import { TestBed } from '@angular/core/testing';
import { FirebaseConfigService } from '../fireBaseConfig/firebase-config.service';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';
import { UtilsService } from '../utils/utils.service';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { ReactiveFormsModule } from '@angular/forms';

describe('FirebaseConfigService', () => {
  let service: FirebaseConfigService;
  let utilsService: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule,
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideStorage(() => getStorage()),
      ],
      providers: [
        FirebaseConfigService,
        UtilsService
      ]
    });
    service = TestBed.inject(FirebaseConfigService);
    utilsService = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
