import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string= '';
  password: string='';
  error: string='';

  constructor(private router: Router, private authService: AuthenticationService) { }

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        // Almacenar el token de autenticación en el almacenamiento local
        localStorage.setItem('token', response.token);
        // Redirigir a la página de usuarios
        this.router.navigate(['/user-list']);
      },
      error => {
        this.error = error.error.message; // Manejar errores de autenticación
      }
    );
  }
}
