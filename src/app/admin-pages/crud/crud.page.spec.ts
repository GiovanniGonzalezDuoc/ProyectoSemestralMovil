import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CRUDPage } from './crud.page';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

describe('CRUDPage', () => {
  let component: CRUDPage;
  let fixture: ComponentFixture<CRUDPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CRUDPage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CRUDPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
