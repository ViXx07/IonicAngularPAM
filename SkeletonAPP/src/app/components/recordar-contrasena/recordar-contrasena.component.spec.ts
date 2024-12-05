import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecordarContrasenaComponent } from './recordar-contrasena.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

describe('RecordarContrasenaComponent', () => {
  let component: RecordarContrasenaComponent;
  let fixture: ComponentFixture<RecordarContrasenaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordarContrasenaComponent ],
      imports: [
        IonicModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RecordarContrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
