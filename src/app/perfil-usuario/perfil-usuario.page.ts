import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonList, IonItem, IonIcon, IonLabel, IonButton, IonCard,
  IonCardHeader, IonInput, IonRow, IonCol, IonListHeader, IonBadge, IonCardContent
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { UserService } from '../Servicios/user.service';
import { PersonService } from '../Servicios/person.service';
import { idCard } from 'ionicons/icons';



@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonButtons, IonList, IonItem, IonIcon, IonLabel, IonButton,
    IonCard, IonCardHeader, RouterLink, IonRow, IonCol, IonListHeader, IonCardContent,
    IonBadge, IonInput
  ]
})
export class PerfilUsuarioPage implements OnInit {


  profile: any;
  personid: any;
  editDatos: boolean = true;
  Guardar: any

  constructor(private usuarioService: UserService, private personService: PersonService) {
    this.personid = localStorage.getItem('id');
  }

  ngOnInit() {
    this.viewProfile();
  }


  editPerfil() {
    this.editDatos = false;
  }


  viewProfile() {
    this.usuarioService.getOneUser(this.personid).subscribe({
      next: (data: any) => {
        this.profile = data;
      },
      error: (error: any) => {
        console.log("error");
      }
    })

  }

  updatePerson() {

    if (this.editDatos) return; // Si no se está editando, no hacer nada

    const id = this.profile.user.person.id; // Obteniendo el id dinámicamente
    const nombreUsuario = this.profile.user.person.nombreUsuario;
    const descripcion = this.profile.user.person.descripcion;


    this.personService.updatePerson(id, nombreUsuario, descripcion).subscribe({
      next: (data: any) => {
        this.profile = data;
        console.log('Perfil actualizado con éxito:', data);
        debugger
      },
      error: (error: any) => {
        console.error('Error al actualizar el perfil:', error);
        debugger
      }
    })
  }
}
