import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonItem, IonThumbnail, IonLabel} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { library, playCircle, radio, search } from 'ionicons/icons';
import { DeezerService } from 'src/app/Servicios/deezer.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonItem, IonThumbnail, IonLabel]
})
export class PrincipalPage implements OnInit {

  canciones: any[] = [];
  searchQuery: string = ''; // Término de búsqueda
  cancionesFiltradas: any[] = []; // Canciones que se mostrarán según la búsqueda
  artistInfo: any = null; // Información del artista
  cancionSeleccionada: any = null;
  audio: HTMLAudioElement | null = null; // Referencia al objeto Audio actual

  constructor(private deezerService: DeezerService) {
    addIcons({ library, playCircle, radio, search });
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

  reproducir(cancion: any) {
    if (this.audio) {
      this.audio.pause(); // Pausar la canción actual
    }
    this.cancionSeleccionada = cancion;
    this.audio = new Audio(cancion.mp3);
    this.audio.play();
  }

  play() {
    if (this.audio) {
      this.audio.play();
      this.startProgressBar();
    }
  }

  pause() {
    if (this.audio) {
      this.audio.pause();
      this.stopProgressBar();
    }
  }

  startProgressBar() {
    const progressBar = document.querySelector('.progress') as HTMLElement;
    if (progressBar) {
      progressBar.style.animationPlayState = 'running';
    }
  }

  stopProgressBar() {
    const progressBar = document.querySelector('.progress') as HTMLElement;
    if (progressBar) {
      progressBar.style.animationPlayState = 'paused';
    }
  }
}

