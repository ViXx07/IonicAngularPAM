import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminSistemaPage } from './admin-sistema.page';
import { IonicModule, ModalController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { FirebaseConfigService } from 'src/app/services/fireBaseConfig/firebase-config.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiRestService } from 'src/app/services/restApi/api-rest.service';

describe('AdminSistemaPage', () => {
  let component: AdminSistemaPage;
  let fixture: ComponentFixture<AdminSistemaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminSistemaPage],
      imports: [
        IonicModule.forRoot(), 
        HttpClientModule
      ],
      providers: [
        UtilsService, 
        FirebaseConfigService,
        ModalController,
        ApiRestService
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AdminSistemaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
