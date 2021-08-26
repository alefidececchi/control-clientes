import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteServicio } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0,
  }
  id: string;

  constructor(
    private clientesServicio: ClienteServicio,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'] //para caputrar el id en el route, es decir, el link
    this.clientesServicio.getCliente(this.id).subscribe( (cliente) => {
      this.cliente = cliente;
    })
  }

  eliminar() {
    if(confirm('¿Seguro que desea eliminar el Cliente?')) {
      this.clientesServicio.eliminarCliente(this.cliente);
      this.router.navigate(['/']);
    }
  }

  guardar({value, valid}: {value: Cliente, valid: boolean}){
    if(!valid) {
      this.flashMessage.show('Por favor rellena el formulario correctamente', {
        cssClass: 'alert-danger', timeput: 4000
      })
    } else {
      value.id = this.id;
      this.clientesServicio.modificar(value);
      this.router.navigate(['/']);
    }
  }

  

}
