import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { LocalNotifications } from '@capacitor/local-notifications';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage implements OnInit {
  emailsolicitado: string = "";
  mensaje: string = "";
  rol_id_rol!: number;
  nombre_usuario: string = "";
  nombre: string = "";
  apellido: string = "";

  constructor(
    private router: Router,
    private storage: NativeStorage,
    private bd: ServicebdService
  ) {}

  ngOnInit() {
    // Recuperar datos almacenados del usuario
    this.storage.getItem('rol_id_rol').then(id => {
      this.rol_id_rol = id;
    }).catch(err => {
      console.error('Error obteniendo rol_id_rol:', err);
    });

    this.storage.getItem('correo_usuario').then(correo => {
      this.emailsolicitado = correo;
    }).catch(err => {
      console.error('Error obteniendo correo_usuario:', err);
    });

    this.storage.getItem('nombre_usuario').then(nombre => {
      this.nombre = nombre;
    }).catch(err => {
      this.bd.presentAlert('Error obteniendo nombre_usuario:', err);
    });
    
    this.storage.getItem('apellido_usuario').then(apellido => {
      this.apellido = apellido;
    }).catch(err => {
      this.bd.presentAlert('Error obteniendo apellido_usuario:', err);
    });

  }

  Contacto() {
    this.bd.insertarContacto(this.emailsolicitado, this.mensaje).then(async () => {
      this.bd.presentToast('bottom', 'Se Ha Enviado Correctamente El Mensaje.');

      // Enviar notificación local
      await LocalNotifications.schedule({
        notifications: [
          {
            title: '¡Mensaje A Administrador!',
            body: `${this.nombre} ${this.apellido} te ha mandado un mensaje de contacto.`,
            id: 1,
            schedule: { at: new Date(Date.now() + 1000 * 5) }, // Notificación después de 5 segundos
          },
        ],
      });

      this.volverAlInicio();
    }).catch(err => {
      console.error('Error al enviar el mensaje:', err);
      this.bd.presentToast('bottom', 'Error al enviar el mensaje.');
    });
  }

  volverAlInicio() {
    this.router.navigate(['/home']);
  }
}
