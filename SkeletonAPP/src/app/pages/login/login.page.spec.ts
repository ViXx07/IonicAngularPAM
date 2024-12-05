import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { IonicModule, ModalController } from '@ionic/angular'; 
import { FormBuilder } from '@angular/forms';
import { FirebaseConfigService } from 'src/app/services/fireBaseConfig/firebase-config.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { HttpClientModule } from '@angular/common/http'; 
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),  
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        HttpClientModule        
      ],
      declarations: [LoginPage],
      providers: [
        FormBuilder, 
        FirebaseConfigService, 
        UtilsService,
        ModalController           
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
