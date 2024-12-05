import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import this module
import { RegistroEmpresaComponent } from './registro-empresa.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

describe('RegistroEmpresaComponent', () => {
  let component: RegistroEmpresaComponent;
  let fixture: ComponentFixture<RegistroEmpresaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroEmpresaComponent ],
      imports: [ 
        IonicModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,  
        HttpClientTestingModule  
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
