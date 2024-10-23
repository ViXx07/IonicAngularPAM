import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminEmpresaPage } from './admin-empresa.page';

describe('AdminEmpresaPage', () => {
  let component: AdminEmpresaPage;
  let fixture: ComponentFixture<AdminEmpresaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEmpresaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
