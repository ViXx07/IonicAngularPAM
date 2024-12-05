import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminEmpresaPage } from './admin-empresa.page';
import { IonicModule, ModalController } from '@ionic/angular';  
import { UtilsService } from 'src/app/services/utils/utils.service';
import { FirebaseConfigService } from 'src/app/services/fireBaseConfig/firebase-config.service';

describe('AdminEmpresaPage', () => {
  let component: AdminEmpresaPage;
  let fixture: ComponentFixture<AdminEmpresaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminEmpresaPage],
      imports: [
        IonicModule.forRoot(), 
      ],
      providers: [
        UtilsService, 
        FirebaseConfigService,
        ModalController
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminEmpresaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
