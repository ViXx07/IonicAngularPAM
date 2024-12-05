import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { OpinaPage } from './opina.page';
import { FirebaseConfigService } from 'src/app/services/fireBaseConfig/firebase-config.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { Empresa } from 'src/app/models/empresa.model'; 
import { Encuesta } from 'src/app/models/encuesta.model';
import { User } from 'src/app/models/user.model'; 
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

describe('OpinaPage', () => {
  let component: OpinaPage;
  let fixture: ComponentFixture<OpinaPage>;
  let modalController: ModalController;

  const mockEmpresa: Empresa = {
    id: '1',
    nombreEmpresa: 'Test Empresa',
    logo: 'test-logo.png',
    estado: 0,
  };

  const mockEncuesta: Encuesta = {
    id: '1',
    idEmpresa: '1',
    pregunta: '¿Hola?'
  };

  const mockUser: User = {
    uid: 'user-id',
    email: 'Test@User.us',
    password: 'test',
    userRole: 0
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OpinaPage ],
      imports: [
        IonicModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,],
      providers: [
        FirebaseConfigService,
        UtilsService,
        ModalController,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OpinaPage);
    component = fixture.componentInstance;
    
    component.empresa = mockEmpresa;
    component.encuesta = mockEncuesta;
    
    component.usuario = mockUser;
    
    fixture.detectChanges(); 
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
