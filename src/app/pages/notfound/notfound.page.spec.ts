import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotfoundPage } from './notfound.page';

describe('NotfoundPage', () => {
  let component: NotfoundPage;
  let fixture: ComponentFixture<NotfoundPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotfoundPage]
    }).compileComponents();

    fixture = TestBed.createComponent(NotfoundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba básica
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
