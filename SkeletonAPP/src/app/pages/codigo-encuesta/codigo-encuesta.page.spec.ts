import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CodigoEncuestaPage } from './codigo-encuesta.page';

describe('CodigoEncuestaPage', () => {
  let component: CodigoEncuestaPage;
  let fixture: ComponentFixture<CodigoEncuestaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CodigoEncuestaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
