import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistroClienteComponent } from './registro-cliente.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

describe('RegistroClienteComponent', () => {
  let component: RegistroClienteComponent;
  let fixture: ComponentFixture<RegistroClienteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroClienteComponent ],
      imports: [
        IonicModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig), 
        AngularFireAuthModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
