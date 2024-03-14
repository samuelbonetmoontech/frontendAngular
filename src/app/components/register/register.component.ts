import { Component, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nuevoUsuario: any = {
    activo:true
  };
  emailExistsError: boolean = false;
 
  @ViewChild('userForm') userForm!: NgForm;
  
  constructor(private userService: UserService, private router: Router) {}

    registrarUsuario() {
      if (this.userForm.invalid) { 
        return;
      }

      this.userService.createUser(this.nuevoUsuario).subscribe(
      {  next: (respuesta) => {
        console.log('Usuario creado con éxito:', respuesta);
        this.router.navigate(['/login']); 
      },
      error: (error) => {
        console.error('Error al crear usuario:', error);
      }}
      );
    }
}

