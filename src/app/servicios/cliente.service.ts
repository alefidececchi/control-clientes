import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Cliente } from "../modelo/cliente.model";

@Injectable()
export class ClienteServicio {
    clientesColeccion: AngularFirestoreCollection<Cliente>;
    clienteDoc: AngularFirestoreDocument<Cliente>;
    clientes: Observable<Cliente[]>
    cliente: Observable<Cliente>;

    constructor(private db: AngularFirestore) {
        this.clientesColeccion = db.collection('clientes', ref => ref.orderBy('saldo', 'desc'))
        //this.clientesColeccion = db.collection('clientes')
    }

    agregarCliente(cliente: Cliente) {
        this.clientesColeccion.add(cliente);
    }

    eliminarCliente(cliente: Cliente) {
        this.clienteDoc = this.db.doc(`clientes/${cliente.id}`);
        this.clienteDoc.delete();
    }

    getCliente(id: string) {
        this.clienteDoc = this.db.doc<Cliente>(`clientes/${id}`);
        //creamos el observable
        this.cliente = this.clienteDoc.snapshotChanges().pipe(    //pipe() para acceder al documento
            map((accion) => {
                if (accion.payload.exists === false) {
                    return null;
                } else {
                    const datos = accion.payload.data() as Cliente; // data() retorna el valor como un Objeto
                    datos.id = accion.payload.id;
                    return datos;
                }
            })
        )
        return this.cliente;
    }

    getClientes(): Observable<Cliente[]> {
        //obtener clientes
        this.clientes = this.clientesColeccion.snapshotChanges().pipe(
            map(cambios => {
                return cambios.map(accion => {
                    const datos = accion.payload.doc.data() as Cliente
                    datos.id = accion.payload.doc.id;
                    return datos;
                })
            })
        );
        return this.clientes;
    }

    modificar(cliente: Cliente) {
        this.clienteDoc = this.db.doc(`clientes/${cliente.id}`);
        this.clienteDoc.update({
            nombre: cliente.nombre,
            apellido: cliente.apellido,
            email: cliente.email,
            saldo: cliente.saldo
        })
    }
}


