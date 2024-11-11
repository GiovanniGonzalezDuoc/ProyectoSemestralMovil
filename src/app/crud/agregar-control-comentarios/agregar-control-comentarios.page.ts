import { Component, OnInit } from '@angular/core';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-agregar-control-comentarios',
  templateUrl: './agregar-control-comentarios.page.html',
  styleUrls: ['./agregar-control-comentarios.page.scss'],
})
export class AgregarControlComentariosPage implements OnInit {

  nombre_rol: string = "";
  tiempo_veto_comentarios!: number;
  motivo_veto_comentarios: string = "";
  comentarios: any[] = []; // Aquí se almacenarán las categorías desde la BD
  comentariosSeleccionado: number[] = []; // Para las categorías seleccionadas
  constructor(private bd:ServicebdService) { }

  ngOnInit() {
    this.bd.fetchComentarios().subscribe(comentarios => {
      this.comentarios = comentarios;
    });
  }
  insertar(){
    const comentarios = this.comentariosSeleccionado[0];
    this.bd.insertarControl(this.tiempo_veto_comentarios,this.motivo_veto_comentarios,comentarios);
  }

}
