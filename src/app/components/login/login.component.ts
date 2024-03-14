import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logueoUsuario: any = {};
  isLoggedIn: boolean = false;
  errorMessage: string = '';

  @ViewChild('userForm') userForm!: NgForm;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {}

  loguearUsuario() {
    if (this.userForm.invalid) {
      return;
    }
  
    this.authenticationService.login(this.logueoUsuario).subscribe(
      (respuesta: any) => {
        console.log(respuesta);
        
        const token = respuesta.token;
        if (token) {
          localStorage.setItem('token', token);
          console.log('Usuario logueado con éxito');
          this.irLista();
        } else {
          console.error('No se pudo obtener el token de la respuesta');
        }
      },
      (error: any) => {
        console.error('Error al iniciar sesión:', error);
        this.errorMessage = 'Credenciales inválidas';
      }
    );
    
    
  }
  irLista() {
    this.isLoggedIn = true;
    this.router.navigate(['/user-list']);
  }

  irRegister() {
    this.isLoggedIn = true;
    this.router.navigate(['/register']);
  }
}
