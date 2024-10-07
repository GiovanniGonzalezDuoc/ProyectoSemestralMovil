import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { UserIDService } from 'src/app/services/user-id.service';

@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.page.html',
  styleUrls: ['./publicar.page.scss'],
})
export class PublicarPage implements OnInit {
  Titulo: string = "";
  Contenido: string = "";
  id_usuario!: number;
  nombre_usuario: any;
  apellido_usuario: any;
  categorias: any[] = []; // Aquí se almacenarán las categorías desde la BD
  categoriasSeleccionadas: number[] = []; // Para las categorías seleccionadas

  constructor(private router: Router, private bd: ServicebdService, private userService: UserIDService) {}

  ngOnInit() {
    this.bd.fetchCategorias().subscribe(categorias => {
      this.categorias = categorias;
    });
    this.id_usuario = this.userService.getUserId();
    this.nombre_usuario = this.userService.getUserName();
    this.apellido_usuario = this.userService.getUserLastName();
  }

  publicar() {
    if (this.Titulo === "" || this.Contenido === "" || this.categoriasSeleccionadas.length === 0) {
      this.bd.presentAlert("La Publicación está incompleta.", "Favor de rellenar todos los campos de la publicación.");
      return;
    }
  
    const categoria_publicacion = this.categoriasSeleccionadas[0];
    const usuario_id_usuario = this.userService.getUserId();
    if (!usuario_id_usuario) {
      this.bd.presentAlert('Error', 'No se encontró el ID del usuario. Inicia sesión nuevamente.');
      return;
    }
  
    const publicacionData = {
      nombre_usuario_publicacion: `${this.nombre_usuario || ''} ${this.apellido_usuario || ''}`.trim(),
      titulo_publicacion: this.Titulo,
      descripcion_publicacion: this.Contenido,
      categoria_publicacion: categoria_publicacion,
      usuario_id_usuario: usuario_id_usuario
    };
  
    // Llamada a insertarPublicacion con los 5 argumentos requeridos
    this.bd.insertarPublicacion(
      publicacionData.nombre_usuario_publicacion,
      publicacionData.titulo_publicacion,
      publicacionData.descripcion_publicacion,
      publicacionData.usuario_id_usuario,
      publicacionData.categoria_publicacion,
    ).then(() => {
      this.bd.presentToast('bottom', 'Se publicó correctamente.');
      this.router.navigate(['/home']);
    }).catch(err => {
      console.error(err);
    });
  }  
}
