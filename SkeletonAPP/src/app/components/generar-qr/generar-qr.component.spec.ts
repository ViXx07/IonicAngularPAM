import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { GenerarQrComponent } from './generar-qr.component';
import { Empresa } from 'src/app/models/empresa.model';
import { Encuesta } from 'src/app/models/encuesta.model';

describe('GenerarQrComponent', () => {
  let component: GenerarQrComponent;
  let fixture: ComponentFixture<GenerarQrComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarQrComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GenerarQrComponent);
    component = fixture.componentInstance;

    // Passing mock data for `empresa` and `encuesta`
    const mockEmpresa: Empresa = {
      id: '1',
      nombreEmpresa: 'Test Empresa',
      logo: 'test-logo-url',
      estado: 0
    };

    const mockEncuesta: Encuesta = {
      id: '1',
      pregunta: '¿Estás satisfecho con nuestro servicio?',
      idEmpresa: '1'
    };

    component.empresa = mockEmpresa;
    component.encuesta = mockEncuesta;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
