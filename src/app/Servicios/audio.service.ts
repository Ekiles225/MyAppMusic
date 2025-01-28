import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audio: HTMLAudioElement | null = null;
  private currentSongIndex: number = -1;
  private playlist: any[] = [];
  private isMuted: boolean = false;

  // BehaviorSubject para emitir la canción actual
  private currentSongSubject = new BehaviorSubject<any>(null);
  currentSong$ = this.currentSongSubject.asObservable();

  reproducir(cancion: any, playlist: any[]) {
    if (this.audio) {
      this.audio.pause();
    }

    this.playlist = playlist;
    this.currentSongIndex = playlist.indexOf(cancion);
    this.audio = new Audio(cancion.mp3);
    this.audio.play();

    // Emitir la canción actual
    this.currentSongSubject.next(cancion);

    this.audio.onended = () => {
      this.siguienteCancion();
    };
  }

  siguienteCancion() {
    if (this.currentSongIndex < this.playlist.length - 1) {
      this.currentSongIndex++;
      const siguiente = this.playlist[this.currentSongIndex];
      this.reproducir(siguiente, this.playlist);
    }
  }

  cancionAnterior() {
    if (this.currentSongIndex > 0) {
      this.currentSongIndex--;
      const anterior = this.playlist[this.currentSongIndex];
      this.reproducir(anterior, this.playlist);
    }
  }

  mute() {
    if (this.audio) {
      this.isMuted = !this.isMuted;
      this.audio.muted = this.isMuted;
    }
  }

  pausa() {
    if (this.audio) {
      this.audio.pause();
    }
  }

  // reanudar() {
  //   if (this.audio) {
  //     this.audio.play();
  //   }
  // }
}
