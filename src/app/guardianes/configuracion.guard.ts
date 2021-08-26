import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Configuracion } from "../modelo/configuracion.model";
import { ConfiguracionServicio } from "../servicios/configuracion.service";

@Injectable()
export class ConfiguracionGuard implements CanActivate {

    constructor(
        private configuracionServicio: ConfiguracionServicio,
        private router: Router
    ) { }

    canActivate(): Observable<boolean> {
        return this.configuracionServicio.getConfiguracion().pipe(
            map((configuracion) => {
                if (configuracion.permitirRegistro) {
                    return true;
                } else {
                    this.router.navigate(['/']);
                    return false;
                }
            })
        );
    }
}