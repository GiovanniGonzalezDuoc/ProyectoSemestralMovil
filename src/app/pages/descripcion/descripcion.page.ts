import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-descripcion',
  templateUrl: './descripcion.page.html',
  styleUrls: ['./descripcion.page.scss'],
})
export class DescripcionPage implements OnInit {
  arregloPublicacion: any;
  likes: number = 25;
  nuevoComentario: string = '';
  isPopoverOpen = false;
  selectedOption!: string;
  fotoPredeterminada: string = "assets/icon/logo.png";
  categorias: any = {}; // Para almacenar los nombres de las categorías

  constructor(
    private router: Router,
    private activedrouter: ActivatedRoute,
    private bd: ServicebdService
  ) {}

  ngOnInit() {
    // Cargar nombres de categorías
    this.bd.fetchCategorias().subscribe(categorias => {
      categorias.forEach(categoria => {
        this.categorias[categoria.id_categoria] = categoria.nombre_categoria; // Suponiendo que tu categoría tiene propiedades id_categoria y nombre
      });
    });

    this.activedrouter.paramMap.subscribe(params => {
      const id = params.get('id'); 
      if (id) {
        this.bd.descripcionPublicaciones(Number(id)).then(() => {
          this.bd.listadoPublicacion.subscribe(data => {
            this.arregloPublicacion = data; 
          });
        });
      }
    });
  }

  agregarComentario() {
    // Lógica para agregar comentario
  }

  openPopover(ev: any) {
    this.isPopoverOpen = true;
  }

  closePopover() {
    this.isPopoverOpen = false;
  }

  handleOption(option: string) {
    this.closePopover();
    setTimeout(() => {
      if (option === 'option1') {
        this.bd.presentToast('bottom', 'El Post Se Eliminó Correctamente.');
        this.router.navigate(['/home']);
      } else if (option === 'option2') {
        this.bd.presentToast('bottom', 'Se Ha Seguido Correctamente Al Usuario.');
        this.router.navigate(['/home']);
      }
    }, 0);
  }

  like() {
    this.bd.presentToast('bottom', 'Se Dio Like Correctamente.');
  }

  guardar() {
    this.bd.presentToast('bottom', 'El Post Se Guardó Correctamente.');
  }

  comentario(){
    // Lógica para comentario
  }
}
