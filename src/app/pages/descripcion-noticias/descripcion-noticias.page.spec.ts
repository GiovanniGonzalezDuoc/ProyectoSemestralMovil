import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DescripcionNoticiasPage } from './descripcion-noticias.page';

describe('DescripcionNoticiasPage', () => {
  let component: DescripcionNoticiasPage;
  let fixture: ComponentFixture<DescripcionNoticiasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DescripcionNoticiasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
