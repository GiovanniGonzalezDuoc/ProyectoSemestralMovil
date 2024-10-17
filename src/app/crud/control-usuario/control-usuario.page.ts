import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Control } from 'src/app/models/control';
import { ServicebdService } from 'src/app/services/servicebd.service';


@Component({
  selector: 'app-control-usuario',
  templateUrl: './control-usuario.page.html',
  styleUrls: ['./control-usuario.page.scss'],
})
export class ControlUsuarioPage implements OnInit {

  arregloControl: Control[] = []; // Cambiado a ControlUsuario[]
  
  constructor(private bd: ServicebdService, private router: Router) { }

  ngOnInit() {
    this.bd.dbState().subscribe(data => {
      if (data) {
        // Subscribir al observable de la lista de controles
        this.bd.fetchControl().subscribe(res => {
          this.arregloControl = res;
          this.cargarNombresUsuarios();
        });
      }
    });
  }

  cargarNombresUsuarios() {
    // Itera sobre el arreglo de controles y para cada control busca el nombre del usuario
    this.arregloControl.forEach((control: Control) => { // Especifica el tipo aquí
      this.bd.listarUsuarioID(control.usuario_id_usuario).then(usuario => {
        if (usuario) {
          control.nombre_usuario = usuario.nombre_usuario;
          control.apellido_usuario = usuario.apellido_usuario;
        } else {
          control.nombre_usuario = 'Usuario no encontrado';
          control.apellido_usuario = '';
        }
      });
    });
  }

  modificar(x: Control) {
    let navigationsExtras: NavigationExtras = {
      state: {
        control: x
      }
    };
    this.router.navigate(['/crud/modificar-control-usuario'], navigationsExtras);
  }

  eliminar(x: Control) {
    this.bd.eliminarRol(x.id_veto); // Cambia esto según el ID correcto a eliminar
  }

  agregar() {
    this.router.navigate(['/crud/agregar-control-usuario']);
  }
}
