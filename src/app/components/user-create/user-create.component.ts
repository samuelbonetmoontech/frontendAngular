import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {
  nuevoUsuario: any = {};

  constructor(private userService: UserService, private router: Router) {}

  guardarUsuario() {
    this.userService.createUser(this.nuevoUsuario).subscribe(
      (respuesta) => {
        console.log('Usuario creado con éxito:', respuesta);
        this.router.navigate(['/user-list']); 
      },
      (error) => {
        console.error('Error al crear usuario:', error);
      }
    );
  }

 
}
