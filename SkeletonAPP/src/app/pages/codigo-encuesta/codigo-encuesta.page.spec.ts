import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CodigoEncuestaPage } from './codigo-encuesta.page';
import { IonicModule, ModalController } from '@ionic/angular'; 
import { FirebaseConfigService } from 'src/app/services/fireBaseConfig/firebase-config.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

describe('CodigoEncuestaPage', () => {
  let component: CodigoEncuestaPage;
  let fixture: ComponentFixture<CodigoEncuestaPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodigoEncuestaPage],
      imports: [
        IonicModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,], 
      providers: [
        FirebaseConfigService, 
        UtilsService, 
        ModalController
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CodigoEncuestaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
