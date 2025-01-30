import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http:HttpClient ) { }

  updatePerson(id:number, nombreUsuario:string, descripcion:string){
    const data ={
      id:id,
      nombreUsuario:nombreUsuario,
      descripcion:descripcion
    }
    const header = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.put<any>('http://127.0.0.1:3000/api/person/'+id, data, { headers: header });
  }

  updateImage(id:any, image:any){
    const data = new FormData(); //los datos imagenes se envian en formato formdata
    data.append('file', image);
    // const header = new HttpHeaders()
    // .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.put<any>('http://localhost:3000/api/update/image/'+id, data);
  }
}
