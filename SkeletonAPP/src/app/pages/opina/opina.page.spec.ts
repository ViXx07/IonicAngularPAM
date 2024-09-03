import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpinaPage } from './opina.page';

describe('OpinaPage', () => {
  let component: OpinaPage;
  let fixture: ComponentFixture<OpinaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OpinaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
