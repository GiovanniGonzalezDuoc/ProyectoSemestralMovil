export class Publicacion {
    id_publicacion!:number;
    nombre_usuario_publicacion!:string;
    titulo_publicacion!:string;
    descripcion_publicacion!:string;
    like_publicacion!:number;
    fecha_publicacion!:Date;
    usuario_id_usuario!:number;
    categoria_publicacion_id_categoria!:number;
    foto!:Blob;
}
