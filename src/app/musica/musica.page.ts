import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnimationController, IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonAvatar, IonLabel, IonButton, IonList, IonImg, IonModal, IonButtons, IonTabButton } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { DeezerService } from '../Servicios/deezer.service';
import { RouterModule } from '@angular/router'; // Importa RouterModule

@Component({
  selector: 'app-musica',
  templateUrl: './musica.page.html',
  styleUrls: ['./musica.page.scss'],
  standalone: true,
  imports: [IonButton, IonLabel, IonAvatar, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule]
})
export class MusicaPage implements OnInit {

  genre: string = ''; // Género recibido
  songs: any[] = []; // Canciones filtradas
  cancionSeleccionada: any = null;
  audio: HTMLAudioElement | null = null; // Referencia al objeto Audio actual
  isPlaying: boolean = false;
  cancionesFiltradas: any[] = []; // Canciones que se mostrarán según la búsqueda


  constructor(
    private deezerService: DeezerService,
    private route: ActivatedRoute,
    private animationCtrl: AnimationController

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
    const cancion = this.songs.find(song => song.mp3 === mp3Url);
    if (cancion) {
      this.reproducir(cancion); // Llama al método reproducir con la canción seleccionada
    }
  }

  siguienteCancion() {
    if (!this.cancionSeleccionada || this.songs.length === 0) {
      console.log('No hay canciones o no hay canción seleccionada.');
      return;
    }

    const index = this.songs.indexOf(this.cancionSeleccionada); // Busca el índice en la lista principal
    if (index !== -1 && index < this.songs.length - 1) {
      const siguiente = this.songs[index + 1]; // Obtén la siguiente canción
      this.reproducir(siguiente); // Reproduce la siguiente canción
    } else {
      console.log('No hay más canciones disponibles.');
    }
  }
  cancionAnterior() {
    if (!this.cancionSeleccionada || this.songs.length === 0) {
      console.log('No hay canciones o no hay canción seleccionada.');
      return;
    }

    const index = this.songs.indexOf(this.cancionSeleccionada); // Busca el índice en la lista principal
    if (index > 0) {
      const anterior = this.songs[index - 1]; // Obtén la canción anterior
      this.reproducir(anterior); // Reproduce la canción anterior
    } else {
      console.log('No hay canciones anteriores disponibles.');
    }
  }


  reproducir(cancion: any) {
    if (this.audio) {
      this.audio.pause(); // Pausar la canción actual
    }
    this.cancionSeleccionada = cancion;
    this.audio = new Audio(cancion.mp3);
    this.audio.play();
    this.audio.onended = () => {
      this.siguienteCancion(); // Reproducir la siguiente canción al terminar la actual
    };
    this.isPlaying = true; // Actualiza el estado de reproducción
  }

  play() {
    if (this.audio) {
      this.audio.play();
    }
  }

  pause() {
    if (this.audio) {
      this.audio.pause();
    }
  }

  pauseYplay() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.audio?.play();
    } else {
      this.audio?.pause();
    }
  }

  mute() {
    if (this.audio) {
      this.audio.muted = !this.audio.muted;
    }
  }

}
