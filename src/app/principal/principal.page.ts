import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonItem, IonThumbnail, IonLabel} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { DeezerService } from 'src/app/Servicios/deezer.service';
import { Router } from 'express';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonItem, IonThumbnail, IonLabel, RouterLink]
})
export class PrincipalPage implements OnInit {

  canciones: any[] = [];
  searchQuery: string = ''; // Término de búsqueda
  cancionesFiltradas: any[] = []; // Canciones que se mostrarán según la búsqueda
  artistInfo: any = null; // Información del artista
  cancionSeleccionada: any = null;
  audio: HTMLAudioElement | null = null; // Referencia al objeto Audio actual
  isPlaying: boolean = false;

  constructor(private deezerService: DeezerService) {
  }

  slideOpts = {
    slidesPerView: 2.2,
    spaceBetween: 10,
  };

  ngOnInit() {
    this.cargarCanciones();
  }

  cargarCanciones() {
    this.deezerService.getSongs('lo último').subscribe(
      (data) => {
        this.canciones = data;
        this.cancionesFiltradas = [...this.canciones]; // Copia inicial
        console.log(this.canciones);
      },
      (error) => {
        console.error('Error al cargar las canciones:', error);
      }
    );
  }

  buscar() {
    const query = this.searchQuery.trim().toLowerCase();

    if (query) {
      this.deezerService.getSongs(query).subscribe(
        (data) => {
          this.cancionesFiltradas = data;
          if (this.cancionesFiltradas.length === 0) {
            console.warn('No se encontraron canciones para la búsqueda.');
          }
        },
        (error) => {
          console.error('Error en la búsqueda:', error);
        }
      );
    } else {
      console.log('Por favor, introduce un término de búsqueda.');
    }
  }

  siguienteCancion() {
    const index = this.cancionesFiltradas.indexOf(this.cancionSeleccionada);
    if (index !== -1 && index < this.cancionesFiltradas.length - 1) {
      this.reproducir(this.cancionesFiltradas[index + 1]);
    } else {
      console.log('No hay más canciones en la lista.');
    }
  }

  cancionAnterior() {
    const index = this.cancionesFiltradas.indexOf(this.cancionSeleccionada);
    if (index > 0) {
      this.reproducir(this.cancionesFiltradas[index - 1]);
    } else {
      console.log('No hay canciones anteriores en la lista.');
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

  pauseYplay(){
    this.isPlaying = !this.isPlaying;
    if(this.isPlaying){
      this.play();
    }else{
      this.pause();
    }
  }

  mute() {
    if (this.audio) {
      this.audio.muted = !this.audio.muted;
    }
  }
}

