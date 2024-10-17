import { Component, OnInit } from '@angular/core';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-agregar-control-usuario',
  templateUrl: './agregar-control-usuario.page.html',
  styleUrls: ['./agregar-control-usuario.page.scss'],
})
export class AgregarControlUsuarioPage implements OnInit {

  nombre_rol: string = "";
  tiempo_veto!: number;
  motivo_veto: string = "";
  usuarios: any[] = []; // Aquí se almacenarán las categorías desde la BD
  usuariosSeleccionado: number[] = []; // Para las categorías seleccionadas
  constructor(private bd:ServicebdService) { }

  ngOnInit() {
    this.bd.fetchUsuario().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }
  insertar(){
    const usuario_id_usuario = this.usuariosSeleccionado[0];
    this.bd.insertarControl(this.tiempo_veto,this.motivo_veto,usuario_id_usuario);
  }
}
