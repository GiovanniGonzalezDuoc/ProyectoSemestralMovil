import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoticiasPage } from './noticias.page';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ApiService } from 'src/app/services/api.service';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { of } from 'rxjs';

describe('NoticiasPage', () => {
  let component: NoticiasPage;
  let fixture: ComponentFixture<NoticiasPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoticiasPage],
      providers: [
        { provide: Router, useValue: { navigate: () => {} } },
        { provide: NativeStorage, useValue: { getItem: () => Promise.resolve(1) } },
        { provide: ApiService, useValue: { getPosts: () => of([{ id_publicacion: 1, titulo: 'Test' }]) } },
        { provide: ServicebdService, useValue: { presentAlert: () => {} } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NoticiasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
