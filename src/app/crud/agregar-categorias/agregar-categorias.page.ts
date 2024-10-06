import { Component, OnInit } from '@angular/core';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-agregar-categorias',
  templateUrl: './agregar-categorias.page.html',
  styleUrls: ['./agregar-categorias.page.scss'],
})
export class AgregarCategoriasPage implements OnInit {

  nombre_categoria: string = "";
  constructor(private bd:ServicebdService) { }

  ngOnInit() {
  }
  insertar(){
    this.bd.insertarCategoria(this.nombre_categoria);
  }
}
