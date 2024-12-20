import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { ModificarEmpresaComponent } from './modificar-empresa.component';
import { ApiRestService } from 'src/app/services/restApi/api-rest.service'; 
import { Empresa } from 'src/app/models/empresa.model'; 
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

describe('ModificarEmpresaComponent', () => {
  let component: ModificarEmpresaComponent;
  let fixture: ComponentFixture<ModificarEmpresaComponent>;

  const mockEmpresa: Empresa = {
    id: '1',
    nombreEmpresa: 'Test Company',
    logo: 'test-logo-url.jpg', 
    estado: 0
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarEmpresaComponent ],
      imports: [
        IonicModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule, 
        HttpClientModule], 
      providers: [ApiRestService], 
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarEmpresaComponent);
    component = fixture.componentInstance;
    
    component.empresa = mockEmpresa;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
