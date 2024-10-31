import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminSistemaPage } from './admin-sistema.page';

describe('AdminSysPage', () => {
  let component: AdminSistemaPage;
  let fixture: ComponentFixture<AdminSistemaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSistemaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
