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
  usuario_id_usuario!: number;
  constructor(private bd:ServicebdService) { }

  ngOnInit() {
  }
  insertar(){
    this.bd.insertarControl(this.tiempo_veto,this.motivo_veto,this.usuario_id_usuario);
  }
}
