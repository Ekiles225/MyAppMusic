import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeezerService {

  private readonly BASE_URL = 'https://deezerdevs-deezer.p.rapidapi.com';
  private readonly API_KEY = '5cb7706abcmsh52ed7934a99a06ep15d9a2jsnffa41311ac30';
  private apiUrl = 'https://deezerdevs-deezer.p.rapidapi.com';

  constructor(private http: HttpClient) { }

  getArtista(idArtista: string): Observable<any> {
    const url = `${this.BASE_URL}/artist/${idArtista}`;
    const headers = new HttpHeaders({
      'x-rapidapi-key': this.API_KEY,
      'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
    });

    return this.http.get(url, { headers }).pipe(
      map((data: any) => ({
        id: data.id,
        link: data.link || '',
        name: data.name || 'Desconocido',
        fans: data.nb_fan || 0,
        picture: data.picture_medium || '',
        albums: data.nb_album || 0
      })),
      catchError((error) => {
        console.error('Error al obtener el artista:', error);
        return of(null); // Retorna un observable con valor null en caso de error
      })
    );
  }



  getSongs(valueSearch: string = 'lo último'): Observable<any[]> {
    const url = `${this.BASE_URL}/search?q=${encodeURIComponent(valueSearch)}`;
    const headers = new HttpHeaders({
      'x-rapidapi-key': this.API_KEY,
      'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
    });

    return this.http.get(url, { headers }).pipe(
      map((response: any) =>
        response.data?.length > 0
          ? response.data.map((el: any) => ({
            id: el.id,
            id_artista: el.artist.id,
            title: el.title_short,
            artist: el.artist.name,
            img: el.album.cover_medium,
            img_xs: el.album.cover_small,
            mp3: el.preview,
            album: el.album.title
          }))
          : [] // Retorna un array vacío si no hay datos
      )
    );
  }
}
