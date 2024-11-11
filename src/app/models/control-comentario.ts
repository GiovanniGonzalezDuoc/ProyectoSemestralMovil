export class ControlComentario {
    id_veto_comentario!:number;
    tiempo_veto_comentario!:number;
    fecha_veto_comentario!:Date;
    motivo_veto_comentario!:string;
    id_comentario!:number;
    nombre_usuario?: string; // opcional al principio
    apellido_usuario?: string; // opcional al principio
    descripcion_comentario?: string; // opcional al principio
}
