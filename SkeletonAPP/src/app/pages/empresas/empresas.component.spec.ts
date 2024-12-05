import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http'; 
import { EmpresasComponent } from './empresas.component';
import { ApiRestService } from 'src/app/services/restApi/api-rest.service';
import { FirebaseConfigService } from 'src/app/services/fireBaseConfig/firebase-config.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

describe('EmpresasComponent', () => {
  let component: EmpresasComponent;
  let fixture: ComponentFixture<EmpresasComponent>;
  let apiRestService: ApiRestService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresasComponent ],
      imports: [
        IonicModule.forRoot(), 
        HttpClientModule  
      ],
      providers: [
        ApiRestService, 
        FirebaseConfigService, 
        UtilsService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmpresasComponent);
    component = fixture.componentInstance;
    apiRestService = TestBed.inject(ApiRestService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
