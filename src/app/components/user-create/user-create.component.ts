import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {
  nuevoUsuario: any = {
    activo:true
  };
 
  @ViewChild('userForm') userForm!: NgForm;
  constructor(private userService: UserService, private router: Router,private fb: FormBuilder) {}

  ngOnInit(): void {
  }

  guardarUsuario() {

    if (this.userForm.invalid) { 
      return;
    }

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
