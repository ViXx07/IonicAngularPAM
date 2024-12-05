import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SplashPage } from './splash.page';
import { IonicModule, ModalController } from '@ionic/angular';  
import { IonicStorageModule } from '@ionic/storage-angular'; 
import { UtilsService } from 'src/app/services/utils/utils.service';

describe('SplashPage', () => {
  let component: SplashPage;
  let fixture: ComponentFixture<SplashPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SplashPage],
      imports: [
        IonicModule.forRoot(),
        IonicStorageModule.forRoot() 
      ],
      providers: [
        ModalController,       
        UtilsService          
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
