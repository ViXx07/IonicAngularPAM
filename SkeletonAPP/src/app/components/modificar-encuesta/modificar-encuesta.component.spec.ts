import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ModificarEncuestaComponent } from './modificar-encuesta.component';
import { Encuesta } from 'src/app/models/encuesta.model';
import { Empresa } from 'src/app/models/empresa.model';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

describe('ModificarEncuestaComponent', () => {
  let component: ModificarEncuestaComponent;
  let fixture: ComponentFixture<ModificarEncuestaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarEncuestaComponent ],
      imports: [
        IonicModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,]
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarEncuestaComponent);
    component = fixture.componentInstance;

    const mockEncuesta: Encuesta = {
      id: '1',
      pregunta: '¿Estás satisfecho con nuestro servicio?',
      idEmpresa: '1'
    };

    const mockEmpresa: Empresa = {
      id: '1',
      nombreEmpresa: 'Test Empresa',
      logo: 'test-logo-url',
      estado: 0
    };

    component.encuesta = mockEncuesta;
    component.empresa = mockEmpresa;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
