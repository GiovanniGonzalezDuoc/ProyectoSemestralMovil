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

  async ngOnInit() {
    try {
      // Recuperar datos almacenados del usuario usando async/await
      const rolId = await this.storage.getItem('rol_id_rol');
      if (rolId) {
        this.rol_id_rol = rolId;
      } else {
        console.error('Rol no encontrado');
      }

      const correo = await this.storage.getItem('correo_usuario');
      if (correo) {
        this.emailsolicitado = correo;
      } else {
        console.error('Correo no encontrado');
      }

      const nombre = await this.storage.getItem('nombre_usuario');
      if (nombre) {
        this.nombre = nombre;
      } else {
        console.error('Nombre no encontrado');
      }

      const apellido = await this.storage.getItem('apellido_usuario');
      if (apellido) {
        this.apellido = apellido;
      } else {
        console.error('Apellido no encontrado');
      }
    } catch (err) {
      console.error('Error al obtener datos de NativeStorage:', err);
      // En caso de error, podrías mostrar una alerta o un toast
      this.bd.presentAlert('Error', 'No se pudieron recuperar los datos del usuario');
    }
  }

  async Contacto() {
    try {
      await this.bd.insertarContacto(this.emailsolicitado, this.mensaje);
      this.bd.presentToast('bottom', 'Se Ha Enviado Correctamente El Mensaje.');

      // Asegurarse de que LocalNotifications está disponible
      if (LocalNotifications.schedule) {
        try {
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
        } catch (err) {
          console.error('Error al programar la notificación local:', err);
          this.bd.presentToast('bottom', 'Error al enviar la notificación.');
        }
      } else {
        console.warn('LocalNotifications no está disponible');
      }

      this.volverAlInicio();
    } catch (err) {
      console.error('Error al enviar el mensaje:', err);
      this.bd.presentToast('bottom', 'Error al enviar el mensaje.');
    }
  }

  volverAlInicio() {
    this.router.navigate(['/home']);
  }
}
