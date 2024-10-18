import { Component } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from './services/servicebd.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  fotoPredeterminada: string = "assets/icon/logo.png";
  nombre_usuario: string = "";
  apellido_usuario: string = "";

  categorias: any[] = []; // Lista de categorías originales
  filteredCategorias: any[] = []; // Lista de categorías filtradas para la búsqueda
  searchTerm: string = ''; // Término de búsqueda

  constructor(private storage: NativeStorage, private bd: ServicebdService, private router: Router) {
    this.storage.getItem('nombre_usuario').then(res => {
      this.nombre_usuario = res;
    }).catch(err => {
      this.bd.presentAlert('Error obteniendo nombre_usuario:', err);
    });

    this.storage.getItem('apellido_usuario').then(res => {
      this.apellido_usuario = res;
    }).catch(err => {
      this.bd.presentAlert('Error obteniendo apellido_usuario:', err);
    });

    this.loadCategoriaNames();
  }

  loadCategoriaNames() {
    this.bd.fetchCategorias().subscribe(categorias => {
      this.categorias = categorias;
      this.filteredCategorias = categorias; // Inicializa la lista filtrada
    });
  }

  descripcion(id: number) {
    let navigationExtras: NavigationExtras = {
      state: {
        id_categoria: id
      }
    };
    this.router.navigate(['/busqueda'], navigationExtras);
  }

  // Método para filtrar categorías basado en el término de búsqueda
  filterCategorias() {
    const term = this.searchTerm.toLowerCase(); // Convierte el término de búsqueda a minúsculas
    this.filteredCategorias = this.categorias.filter(categoria =>
      categoria.nombre_categoria.toLowerCase().includes(term) // Filtra según el nombre
    );
  }

}
