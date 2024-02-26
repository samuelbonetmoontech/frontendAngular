import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  logueoUsuario: any = {};

  constructor(
    private userService: UserService,
    private authService: AuthenticationService, // Importa y declara el servicio de autenticación
    private router: Router
  ) {}

  loguearUsuario() {
   
    this.authService.login(this.logueoUsuario.username, this.logueoUsuario.password).subscribe(
      (respuesta) => {
        console.log('Usuario logueado con éxito:', respuesta);
  
        this.router.navigate(['/user-list']); 
      },
      (error) => {
        console.error('Error al loguear usuario:', error);
      }
    );
  }
}
