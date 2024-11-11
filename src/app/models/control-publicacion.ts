export class ControlPublicacion {
    id_veto_publicacion!:number;
    tiempo_veto_publicacion!:number;
    fecha_veto_publicacion!:Date;
    motivo_veto_publicacion!:string;
    publicacion_id_publicacion!:number;
    nombre_publicacion?: string; // opcional al principio
    descripcion_publicacion?: string; // opcional al principio
}
