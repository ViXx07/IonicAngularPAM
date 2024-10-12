import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminSysPage } from './admin-sys.page';

describe('AdminSysPage', () => {
  let component: AdminSysPage;
  let fixture: ComponentFixture<AdminSysPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSysPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
