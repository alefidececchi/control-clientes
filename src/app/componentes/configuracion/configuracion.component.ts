import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Configuracion } from 'src/app/modelo/configuracion.model';
import { ConfiguracionAgregar } from 'src/app/modelo/configuracionAgregar.model';
import { ConfiguracionServicio } from 'src/app/servicios/configuracion.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  permitirRegistro: boolean;
  permitirAgregarClientes: boolean;

  constructor(
    private router: Router,
    private configuracionServicio: ConfiguracionServicio
  ) { }

  ngOnInit(): void {
    this.configuracionServicio.getConfiguracion().subscribe(
      (configuracion: Configuracion) => {
        this.permitirRegistro = configuracion.permitirRegistro;
      }
    );
    this.configuracionServicio.getAgregarClientes().subscribe(
      (agregar: ConfiguracionAgregar) => {
        this.permitirAgregarClientes = agregar.permitirAgregarClientes;
      }
    )
  }

  guardar() {
    let configuracion = { permitirRegistro: this.permitirRegistro };
    let configuracionAgregar = { permitirAgregarClientes: this.permitirAgregarClientes };

    this.configuracionServicio.modificarConfiguracion(configuracion);
    this.configuracionServicio.modificarConfiguracionAgregar(configuracionAgregar);
    this.router.navigate(['/']);
  }

}
