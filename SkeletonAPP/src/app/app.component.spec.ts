import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular'; 
import { ActivatedRoute } from '@angular/router'; 
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

describe('AppComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [IonicModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,], 
      providers: [
        {
          provide: ActivatedRoute, 
          useValue: { snapshot: { params: {} } } 
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
