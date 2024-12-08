import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonGrid, IonCol, IonRow, IonFooter, IonImg, IonCardTitle, IonCardHeader, IonCard, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar,IonButton,IonIcon,IonButtons,IonMenu, IonList } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonIcon, IonButtons, IonList,IonItem,IonLabel,IonCard,IonCardHeader,IonCardTitle,
    IonImg, IonFooter,IonRow, IonCol, IonGrid, RouterLink
  ]
})
export class PrincipalPage implements OnInit {


  albums = [
    { image: 'assets/album1.jpg', title: 'Álbum 1', artist: 'Artista 1' },
    { image: 'assets/album2.jpg', title: 'Álbum 2', artist: 'Artista 2' },
    { image: 'assets/album3.jpg', title: 'Álbum 3', artist: 'Artista 3' },
  ];

  songs = [
    { title: 'Canción 1', artist: 'Artista 1' },
    { title: 'Canción 2', artist: 'Artista 2' },
    { title: 'Canción 3', artist: 'Artista 3' },
  ];


  //user:any;
  constructor() { }

  playSong(song: any) {
    console.log(`Reproduciendo: ${song.title} de ${song.artist}`);
    // Aquí puedes añadir la lógica para reproducir la canción.
  }
  
  slideOpts = {
    slidesPerView: 2.2,
    spaceBetween: 10,
  };

  ngOnInit() {
    // this.user = localStorage.getItem('username') esto es para mostar el usuario en una esquinita
    //luego esta variable user la uso en el html <span>user</span>
  }

}

