import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class LoginService {

    /*API de AngularFireAuth regresa una promesa una vez que se hizo login es por eso que 
     se debe utilizar una instancia de Promise*/
    
    constructor(private authService: AngularFireAuth) {}
    
    getAuth() {
        return this.authService.authState.pipe(
            map( userAuth => userAuth )
        );
    }
    
    login(email: string, password: string) {
        return new Promise((resolve, rejected) => {
            this.authService.signInWithEmailAndPassword(email, password).then(
                datos => resolve(datos),
                error => rejected(error)
            )
        })

    }

    logout() {
        this.authService.signOut();
    }

    registrar(email: string, password: string) {
        return new Promise((resolve, reject) => {
            this.authService.createUserWithEmailAndPassword(email, password)
            .then( datos => resolve(datos),
            error => reject(error));
        })
    }

    

}