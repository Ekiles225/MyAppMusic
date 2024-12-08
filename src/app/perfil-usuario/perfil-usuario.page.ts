import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons,IonList, IonItem, IonIcon, IonLabel, IonButton, IonCard,
  IonCardHeader, IonInput, IonRow, IonCol, IonListHeader, IonBadge, IonCardContent
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { UserService } from '../Servicios/user.service';
import { PersonService } from '../Servicios/person.service'; 



@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonButtons, IonList, IonItem, IonIcon, IonLabel,  IonButton,
    IonCard, IonCardHeader, RouterLink, IonRow, IonCol, IonListHeader, IonCardContent,
    IonBadge,IonInput
  ]
})
export class PerfilUsuarioPage implements OnInit {

  playlists = [
    { title: 'Mis Favoritas', songs: ['Song 1', 'Song 2', 'Song 3'], image: 'assets/playlist1.jpg' },
    { title: 'Workout', songs: ['Song A', 'Song B'], image: 'assets/playlist2.jpg' },
    { title: 'Relax', songs: ['Song X', 'Song Y', 'Song Z'], image: 'assets/playlist3.jpg' },
    { title: 'Fiesta', songs: ['Song 4', 'Song 5', 'Song 6'], image: 'assets/playlist4.jpg' },
  ];

  user = {
    name: 'Juan Pérez',
    description: 'Amante de la música y los ritmos electrónicos.',
  };

  profile:any;
  personid:any;
  editDatos:boolean=true;
  Guardar:any

  constructor(private usuarioService:UserService, private personService:PersonService) { 
    this.personid = localStorage.getItem('id');
  }

  ngOnInit() {
    this. viewProfile();
  }

  addPlaylist() {
    console.log('Crear nueva playlist');
    // Aquí puedes implementar la lógica para crear una nueva playlist.
  }

  editPerfil(){
    this.editDatos = false;
  }


   darLike(playlist: any) {
    if (playlist.liked) {
      playlist.likes--;
    } else {
      playlist.likes++;
    }
    playlist.liked = !playlist.liked;
  }


  viewProfile(){
    this.usuarioService.getOneUser(this.personid).subscribe({
      next:(data:any)=>{
        this.profile=data;
      },
      error:(error:any)=>{
        console.log("error");
      }
    })

  }

  updatePerson(){

    if (this.editDatos) return; // Si no se está editando, no hacer nada

    const nombreUsuario = this.profile.user.person.nombreUsuario;
    const descripcion = this.profile.user.person.descripcion;


    this.personService.updatePerson(1, nombreUsuario, descripcion).subscribe({
      next:(data:any)=>{  
        this.profile=data;
        console.log('Perfil actualizado con éxito:', data);
        debugger
      },
      error:(error:any)=>{
        console.error('Error al actualizar el perfil:', error);
          debugger
      }
    })
}
}
