import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { NgForm } from '@angular/forms';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  userName: string = '';
  userEmail: string = '';
  userPassword: string = '';
  originalUserPassword: string = ''; 
  userActivo: boolean = true;
  edit: boolean = false;
  userId: string = ''; 
  emailExists: boolean=false;

  @ViewChild('userForm') userForm!: NgForm;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id']; 
      this.userService.getUserById(this.userId).subscribe(
        (user: User) => {
          this.userName = user.name; 
          this.userEmail = user.email; 
          this.userActivo = user.activo !== undefined ? user.activo : false ;
          this.originalUserPassword = user.password; 
          this.edit = true;
        },
        error => {
          console.error('Error al obtener usuario por ID:', error);
        }
      );
      
    });
  }

  updateUser(): void {
    if (this.userForm.invalid) { 
      return;
    }


    let updatedPassword = this.originalUserPassword;
    if (this.userPassword && this.userPassword !== this.originalUserPassword) {
      updatedPassword = bcrypt.hashSync(this.userPassword, 10);
    }

    const updatedUser: User = {
      _id: this.userId,
      name: this.userName,
      email: this.userEmail,
      password: updatedPassword, 
      activo: this.userActivo
    };

    this.userService.updateUser(this.userId, updatedUser).subscribe(
      () => {
        console.log('Usuario actualizado con éxito');
      },
      error => {
        console.error('Error al actualizar usuario:', error);
      }
    );
  }

  checkEmailExists(email: string): void {
    this.userService.checkEmailExists(email).subscribe(
      exists => {
        this.emailExists = exists;
      },
      error => {
        console.error('Error al verificar el correo electrónico:', error);
      }
    );
  }
}
