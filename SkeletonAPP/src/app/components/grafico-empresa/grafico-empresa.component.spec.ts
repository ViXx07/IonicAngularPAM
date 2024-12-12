import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GraficoEmpresaComponent } from './grafico-empresa.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';

describe('GraficoAdminComponent', () => {
  let component: GraficoEmpresaComponent;
  let fixture: ComponentFixture<GraficoEmpresaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficoEmpresaComponent ],
      imports: [
        IonicModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GraficoEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
