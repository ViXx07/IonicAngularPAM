import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecordarContrasenaPage } from './recordar-contrasena.page';

describe('RecordarContrasenaPage', () => {
  let component: RecordarContrasenaPage;
  let fixture: ComponentFixture<RecordarContrasenaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordarContrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
