import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerificacionEmailPage } from './verificacion-email.page';

describe('VerificacionEmailPage', () => {
  let component: VerificacionEmailPage;
  let fixture: ComponentFixture<VerificacionEmailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificacionEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
