import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router desde @angular/router
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UserService,
    private router: Router // Inyecta Router en el constructor
  ) {}

  editUser(id: string): void {
    this.router.navigate(['/user-edit', id]);
  }
  

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      users => {
        console.log('Usuarios recibidos:', users); // Verifica los datos en la consola
        this.users = users;
      },
      error => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }  

  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe(
      () => {
        // Actualizar la lista de usuarios después de eliminar
        this.users = this.users.filter(user => user._id !== id);
      },
      error => {
        console.error('Error al eliminar usuario:', error);
      }
    );
  }
  
}
