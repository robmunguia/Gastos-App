


export class IngresoEgreso {

    public descripcion: string;
    public monto: number;
    public tipo: string;
    public uid?: string;

    constructor ( obj ) {

        this.descripcion = obj && obj.descripcion || null;
        this.monto = obj && obj.monto || null;
        this.tipo = obj && obj.tipo || null;
        // this.uid = obj && obj.uid || null;

    }

}


