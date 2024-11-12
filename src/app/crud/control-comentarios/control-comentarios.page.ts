import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ControlComentario } from 'src/app/models/control-comentario';
import { ServicebdService } from 'src/app/services/servicebd.service';


@Component({
  selector: 'app-control-comentarios',
  templateUrl: './control-comentarios.page.html',
  styleUrls: ['./control-comentarios.page.scss'],
})
export class ControlComentariosPage implements OnInit {

  arregloControl: ControlComentario[] = []; // Cambiado a ControlUsuario[]
  
  constructor(private bd: ServicebdService, private router: Router) { }

  ngOnInit() {
    this.listarControlComentarios();
  }

  listarControlComentarios(){
    this.bd.dbState().subscribe(data => {
      if (data) {
        // Subscribir al observable de la lista de controles
        this.bd.fetchControlComentarios().subscribe(res => {
          this.arregloControl = res;
        });
      }
    });
  }

  modificar(x: ControlComentario) {
    let navigationsExtras: NavigationExtras = {
      state: {
        control: x
      }
    };
    this.router.navigate(['/crud/modificar-control-comentarios'], navigationsExtras);
  }

  eliminar(x: ControlComentario) {
    this.bd.eliminarControl(x.id_veto_comentario); // Cambia esto según el ID correcto a eliminar
  }

  agregar() {
    this.router.navigate(['/crud/agregar-control-comentarios']);
  }

}
