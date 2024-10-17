export class Control {
    id_veto!:number;
    tiempo_veto!:number;
    fecha_veto!:Date;
    motivo_veto!:string;
    usuario_id_usuario!:number;
    nombre_usuario?: string; // opcional al principio
    apellido_usuario?: string; // opcional al principio
}
