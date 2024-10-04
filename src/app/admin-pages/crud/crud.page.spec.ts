import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CRUDPage } from './crud.page';

describe('CRUDPage', () => {
  let component: CRUDPage;
  let fixture: ComponentFixture<CRUDPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CRUDPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
