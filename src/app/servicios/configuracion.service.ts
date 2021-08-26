import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Configuracion } from "../modelo/configuracion.model";
import { ConfiguracionAgregar } from "../modelo/configuracionAgregar.model";

@Injectable()
export class ConfiguracionServicio {

    configuracionDoc: AngularFirestoreDocument;
    configuracionDocAgregar: AngularFirestoreDocument;
    configuracion: Observable<Configuracion>;
    configuracionAgregar: Observable<ConfiguracionAgregar>;
    

    idRegistro: string = 'registro';
    idAgregarClientes: string = 'agregarClientes';

    constructor(private db: AngularFirestore) {}

    getConfiguracion(): Observable<Configuracion> {
        this.configuracionDoc = this.db.doc<Configuracion>(`configuracion/${this.idRegistro}`);
        this.configuracion = this.configuracionDoc.valueChanges();
        return this.configuracion;
    }

    modificarConfiguracion(configuracion: Configuracion) {
        this.configuracionDoc = this.db.doc<Configuracion>(`configuracion/${this.idRegistro}`);
        this.configuracionDoc.update(configuracion);
    }

    getAgregarClientes(): Observable<ConfiguracionAgregar> {
        this.configuracionDocAgregar = this.db.doc<ConfiguracionAgregar>(`configuracion/${this.idAgregarClientes}`);
        this.configuracionAgregar = this.configuracionDocAgregar.valueChanges();
        return this.configuracionAgregar;
    }

    modificarConfiguracionAgregar(configuracionAgregar: ConfiguracionAgregar){
        this.configuracionDocAgregar = this.db.doc<ConfiguracionAgregar>(`configuracion/${this.idAgregarClientes}`);
        this.configuracionDocAgregar.update(configuracionAgregar);
    }

}