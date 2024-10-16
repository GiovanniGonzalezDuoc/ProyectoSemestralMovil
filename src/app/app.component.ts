import { Component, OnInit } from '@angular/core';
import { ServicebdService } from './services/servicebd.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  personasSiguiendo: any[] = []; // Lista completa de seguidores
  categorias: any[] = []; // Categorías traídas de la base de datos
  id_usuario!: number;
  fotoPredeterminada: string = 'assets/icon/logo.png';
  nombre_usuario: string = '';
  apellido_usuario: string = '';
  searchTerm: string = ''; // Término de búsqueda para seguidores
  searchCategoria: string = ''; // Término de búsqueda para categorías

  constructor(private bd: ServicebdService, private storage: NativeStorage) {}

  async ngOnInit() {
    await this.cargarDatosUsuario();
    await this.listarCategorias(); // Cargar categorías
    await this.listarSeguimientos(); // Cargar seguidores
  }

  async cargarDatosUsuario() {
    try {
      const id = await this.storage.getItem('id_usuario');
      this.bd.presentAlert('ID Usuario:', id); // Debug: Verificar ID
      this.id_usuario = id;

      this.nombre_usuario = await this.storage.getItem('nombre_usuario');
      this.apellido_usuario = await this.storage.getItem('apellido_usuario');
    } catch (err) {
      console.error('Error al cargar datos del usuario:', err);
    }
  }

  async listarSeguimientos() {
    try {
      // Llamamos a la función de servicio que devuelve los seguidores con datos completos
      const seguidores = await this.bd.listarSeguimientos(this.id_usuario);
  
      this.personasSiguiendo = seguidores.map((s) => ({
        id: s.id,
        nombre: `${s.nombre} ${s.apellido}`, // Concatenamos nombre y apellido
        foto: this.fotoPredeterminada,
      }));
    } catch (error) {
      console.error('Error al listar los seguidores:', error);
    }
  
    // Cargar la lista de seguidores desde la base de datos
    await this.bd.listarSeguimientos(this.id_usuario);
  }

  async listarCategorias() {
    this.bd.fetchCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    });
  }

  filteredFollowers() {
    const term = this.searchTerm.toLowerCase();
    return this.personasSiguiendo.filter((persona) =>
      persona.nombre.toLowerCase().includes(term)
    );
  }

  filteredCategorias() {
    const term = this.searchCategoria.toLowerCase();
    return this.categorias.filter((categoria) =>
      categoria.nombre_categoria.toLowerCase().includes(term)
    );
  }
}
