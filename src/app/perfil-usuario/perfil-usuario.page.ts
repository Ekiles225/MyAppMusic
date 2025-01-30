import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonButton,
  IonAlert,
  AnimationController,
  AlertController
} from '@ionic/angular/standalone';

import { RouterLink } from '@angular/router';
import { UserService } from '../Servicios/user.service';
import { PersonService } from '../Servicios/person.service';
import { IUser } from '../interface/IUser';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
  standalone: true,
  imports: [IonAlert, IonButton, IonAvatar, CommonModule, FormsModule, IonList, IonItem, IonLabel,
    RouterLink
  ]
})


export class PerfilUsuarioPage implements OnInit {


  profile: any;
  personid: any;
  editDatos: boolean = true;

  // Configuración del ion-alert
  alertInputs: any[] = []; // Inputs dinámicos del ion-alert
  alertButtons: any[] = []; // Botones del ion-alert


  playlists: any[] = [
    { name: 'Bachata', genre: 'bachata' },
    { name: 'Rock', genre: 'rock' },
    { name: 'Pop', genre: 'pop' },
    { name: 'Balada', genre: 'balada' },

    // Agrega más playlists según sea necesario
  ];

  constructor(private alertController: AlertController, private usuarioService: UserService, private personService: PersonService, private animationCtrl: AnimationController) {
    this.personid = localStorage.getItem('id');
  }

  ngOnInit() {
    this.viewProfile();
    console.log('Playlists cargadas:', this.playlists);
  }

  // cosas de la edicion 
  editPerfil() {
    this.editDatos = false;
  }

  viewProfile() {
   
    this.usuarioService.getOneUser(this.personid).subscribe({
      next: (data: any) => {
  
        this.profile = data;

        // Configurar los inputs del ion-alert con los datos del perfil
        this.alertInputs = [
          {
            name: 'nombreUsuario',
            type: 'text',
            placeholder: 'Nombre de usuario',
            value: this.profile.user.person.nombreUsuario, // Valor actual
          },
          {
            name: 'descripcion',
            type: 'text',
            placeholder: 'Descripción',
            value: this.profile.user.person.descripcion, // Valor actual
          },
        ];

        // Configurar los botones del ion-alert
        this.alertButtons = [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Guardar',
            role: 'confirm',
            handler: (data: any) => this.updatePerson(data), // Llamar al método para guardar
          },
        ];
      },
      error: () => {
        console.error('Error al cargar el perfil');
      },
    });
  }

  updatePerson(data: any) {
  
    const id = this.profile.user.person.id;
    const nombreUsuario = data.nombreUsuario;
    const descripcion = data.descripcion;

    this.personService.updatePerson(id, nombreUsuario, descripcion).subscribe({
      next: (response: any) => {
        this.profile.user.person.nombreUsuario = nombreUsuario;
        this.profile.user.person.descripcion = descripcion;
        console.log('Perfil actualizado con éxito:', response);
      },
      error: (err: any) => {
        console.error('Error al actualizar el perfil:', err);
      },
    });
  }

  changeImage(event:any){
    const file = event.target.files[0];
    
    this.personService.updateImage(this.personid, file).subscribe({
      next: (data:any) => {
        console.log('Imagen actualizada con éxito:', data);
       
        this.viewProfile();
      },
      error: (error: any) => {
        console.error('Error al actualizar la imagen:', error);
      },
    }); 
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'FOTO PERFIL',
      subHeader: 'Foto actualizada con exito',
      message: 'Foto actualizada con exito',
      buttons: ['Action'],
    });

    await alert.present();
  }
}
