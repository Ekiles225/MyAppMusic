import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonList, IonItem, IonIcon, IonLabel, IonInput, IonAvatar, IonInfiniteScroll,
  IonInfiniteScrollContent, InfiniteScrollCustomEvent, IonButton, IonPopover } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { UserService } from '../Servicios/user.service';
import { PersonService } from '../Servicios/person.service';


@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
  standalone: true,
  imports: [IonPopover, IonButton, IonInfiniteScroll, IonAvatar, IonContent, CommonModule, FormsModule, IonList, IonItem, IonIcon, IonLabel,
     RouterLink, IonInput, IonInfiniteScrollContent
  ]
})


export class PerfilUsuarioPage implements OnInit {


  profile: any;
  personid: any;
  editDatos: boolean = true;
  playlists: any[] = [
    { name: 'Playlist 1', image: 'assets/image.png' },
    { name: 'Playlist 2', image: 'assets/principalMusica.jpg' },
    // Agrega más playlists según sea necesario
  ];

  isMenuOpen: boolean[] = [];

  constructor(private usuarioService: UserService, private personService: PersonService) {
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
      },
      error: (error: any) => {
        console.error('Error al actualizar el perfil:', error);
      }
    })
  }

  // muestra de los playList 

  openMenu(index: number) {
    this.isMenuOpen[index] = true;
  }

  closeMenu(index: number) {
    this.isMenuOpen[index] = false;
  }

  editPlaylist(index: number) {
    // Lógica para editar la playlist
    console.log('Editar playlist:', this.playlists[index]);
    this.closeMenu(index);
  }

  deletePlaylist(index: number) {
    // Lógica para eliminar la playlist
    console.log('Eliminar playlist:', this.playlists[index]);
    this.playlists.splice(index, 1);
    this.closeMenu(index);
  }

}
