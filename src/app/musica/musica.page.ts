import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonAvatar, IonLabel, IonButton } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { DeezerService } from '../Servicios/deezer.service';



@Component({
  selector: 'app-musica',
  templateUrl: './musica.page.html',
  styleUrls: ['./musica.page.scss'],
  standalone: true,
  imports: [IonButton, IonLabel, IonAvatar, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MusicaPage implements OnInit {

  genre: string = ''; // Género recibido
  songs: any[] = []; // Canciones filtradas

  constructor(
    private route: ActivatedRoute,
    private deezerService: DeezerService
  ) { }

  ngOnInit() {
     // Obtener el género desde la URL
     this.route.paramMap.subscribe(params => {
      this.genre = params.get('genre') || ''; // Captura el género
      this.fetchSongs(); // Llama al método para obtener canciones
    });
  }

  fetchSongs() {
    if (this.genre) {
      this.deezerService.getSongs(this.genre).subscribe({
        next: (songs) => {
          this.songs = songs; // Guardar las canciones
          console.log('Canciones filtradas:', songs);
        },
        error: (err) => {
          console.error('Error al obtener canciones:', err);
        }
      });
    }
  }
  
  playSong(mp3Url: string) {
    const audio = new Audio(mp3Url);
    audio.play();
    console.log('Reproduciendo:', mp3Url);
  }
  
}
