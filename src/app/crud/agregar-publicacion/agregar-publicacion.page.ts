import { Component, OnInit } from '@angular/core';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-agregar-publicacion',
  templateUrl: './agregar-publicacion.page.html',
  styleUrls: ['./agregar-publicacion.page.scss'],
})
export class AgregarPublicacionPage implements OnInit {
  nombre_usuario:string="";
  titulo_publicacion:string="";
  descripcion_publicacion:string="";
  categoria_publicacion_id_categoria!:number;
  usuario_id_usuario!:number;
  foto!:Blob;

  constructor(private bd:ServicebdService) { }

  ngOnInit() {
  }
  insertar(){
    this.bd.insertarPublicacion(this.nombre_usuario,this.titulo_publicacion,this.descripcion_publicacion,this.categoria_publicacion_id_categoria,this.usuario_id_usuario,this.foto);
  }
}
