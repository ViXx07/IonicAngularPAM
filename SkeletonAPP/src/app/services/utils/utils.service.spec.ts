import { TestBed } from '@angular/core/testing';

import { UtilsService } from '../utils/utils.service';
import { IonicModule } from '@ionic/angular';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      providers: [UtilsService],
    });
    service = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
