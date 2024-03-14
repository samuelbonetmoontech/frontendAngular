import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  userName: string | undefined;
  connectionLogs: any[] = [];
  logsVisible: boolean = false; 

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  exitUser(): void {
    this.router.navigate(['/login']); 
  }

  editUser(id: string): void {
    this.router.navigate(['/user-edit', id]);
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      users => {
        console.log('Usuarios recibidos:', users); 
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
        this.users = this.users.filter(user => user._id !== id);
      },
      error => {
        console.error('Error al eliminar usuario:', error);
      }
    );
  }

  viewConnectionLogs(userId: string): void {
    this.userService.getConnectionLogs(userId).subscribe(
      (logs: any[]) => {
        this.connectionLogs = logs;
        this.logsVisible = !this.logsVisible;
         
      },
      error => {
        console.error('Error al cargar los logs de conexión:', error);
      }
    );
  }

}
