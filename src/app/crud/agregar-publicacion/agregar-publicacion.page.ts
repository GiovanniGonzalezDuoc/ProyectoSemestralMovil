import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
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
  foto!:any;

  constructor(private bd:ServicebdService) { }

  ngOnInit() {
  }
  insertar(){
    this.bd.insertarPublicacion(this.nombre_usuario,this.titulo_publicacion,this.descripcion_publicacion,this.categoria_publicacion_id_categoria,this.usuario_id_usuario,this.foto);
  }
    // Función para tomar la foto
    takePicture = async () => {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri
      });
    
      // image.webPath will contain a path that can be set as an image src.
      // You can access the original file using image.path, which can be
      // passed to the Filesystem API to read the raw data of the image,
      // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
      this.foto = image.webPath;
    
    };
}
