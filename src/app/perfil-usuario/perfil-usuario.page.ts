import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonImg,IonList, IonItem, IonIcon, IonLabel, IonNote, IonButton, IonFooter, IonCard,
  IonCardHeader, IonCardTitle, IonCardContent, IonThumbnail, IonInput
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { UserService } from '../Servicios/user.service';


@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonButtons, IonBackButton, IonImg, IonList, IonItem, IonIcon, IonLabel, IonNote, IonButton, IonFooter,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, RouterLink, IonThumbnail,IonInput
  ]
})
export class PerfilUsuarioPage implements OnInit {

  playlists = [
    {
      id: 1,
      titulo: 'Mis Favoritas',
      descripcion: 'Canciones que escucho todos los días.',
      imagen: 'assets/playlist1.jpg',
      likes: 10,
      liked: false,
    },
    {
      id: 2,
      titulo: 'Relajación',
      descripcion: 'Música para momentos tranquilos.',
      imagen: 'assets/playlist2.jpg',
      likes: 5,
      liked: false,
    },
    {
      id: 3,
      titulo: 'Energía',
      descripcion: 'Canciones para cargar energía.',
      imagen: 'assets/playlist3.jpg',
      likes: 8,
      liked: false,
    },
  ];

  profile:any;
  personid:any;

  constructor(private usuarioService:UserService) { 
    this.personid = localStorage.getItem('id');
  }

  ngOnInit() {
    this. viewProfile();
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
        debugger
      },
      error:(error:any)=>{
        debugger
      }
    })

  }
}
