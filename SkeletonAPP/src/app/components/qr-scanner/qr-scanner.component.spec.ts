import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';  
import { QrScannerComponent } from './qr-scanner.component';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { Platform } from '@ionic/angular';  

describe('QrScannerComponent', () => {
  let component: QrScannerComponent;
  let fixture: ComponentFixture<QrScannerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QrScannerComponent ],
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule  
      ],
      providers: [
        Platform,  
        UtilsService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(QrScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
