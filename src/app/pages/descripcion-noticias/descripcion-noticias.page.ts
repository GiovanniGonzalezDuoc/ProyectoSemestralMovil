import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-descripcion-noticias',
  templateUrl: './descripcion-noticias.page.html',
  styleUrls: ['./descripcion-noticias.page.scss'],
})
export class DescripcionNoticiasPage implements OnInit {

  arregloPublicacion: any; // Para almacenar los datos de la publicación
  rol_id_rol!: number; // Para almacenar el rol del usuario
  fotoPredeterminada: string = "assets/icon/logo.png";

  constructor(
    private router: Router, 
    private activedrouter: ActivatedRoute, 
    private bd: ServicebdService, 
    private storage: NativeStorage
  ) {
    this.storage.getItem('rol_id_rol').then(res=>{
      this.rol_id_rol = res;
    })
  }

  ngOnInit() {
    this.getNavigationData(); // Llama al método para obtener los datos de navegación
  }

  getNavigationData() {
    // Obtener los datos de la publicación a través de NavigationExtras
    this.arregloPublicacion = this.router.getCurrentNavigation()?.extras.state?.['Noticias'];
    
    if (!this.arregloPublicacion) {
      // Manejar el caso en que no se reciban datos
      this.bd.presentAlert('Error', 'No se encontraron datos de la publicación.');
    }
  }
}
