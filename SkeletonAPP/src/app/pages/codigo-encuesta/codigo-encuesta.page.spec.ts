import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CodigoEncuestaPage } from './codigo-encuesta.page';
import { IonicModule, ModalController } from '@ionic/angular'; 
import { FirebaseConfigService } from 'src/app/services/fireBaseConfig/firebase-config.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

describe('CodigoEncuestaPage', () => {
  let component: CodigoEncuestaPage;
  let fixture: ComponentFixture<CodigoEncuestaPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodigoEncuestaPage],
      imports: [IonicModule.forRoot()], 
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
