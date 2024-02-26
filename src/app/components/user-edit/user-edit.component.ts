import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {
 
  /*usuario: User;*/
  editoUsuario: any = {};


  constructor(private route: ActivatedRoute, private userService: UserService,private router: Router) { }

  ngOnInit(): void {
    /*const idUsuario = this.route.snapshot.params['id'];
    this.usuario = this.userService.obtenerUsuarioPorId(idUsuario);*/
  }

  /*editarUsuario() {
    this.userService.updateUser(this.userId, this.editoUsuario).subscribe(
      (respuesta) => {
        console.log('Usuario editado con éxito:', respuesta);
        this.router.navigate(['/user-list']); 
      },
      (error) => {
        console.error('Error al editar usuario:', error);
      }
    );
  }*/
  

  }
  
  

