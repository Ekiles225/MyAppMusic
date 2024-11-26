import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private htt:HttpClient) { }

  //metodo d registro de usuario que no tiene cuenta 
  registerUser(nombre:string, apellido:string, correo:any, telefono:string, pasword:any) {

    const DataUser = {
      nombre:nombre,
      apellido:apellido,
      correo:correo,
      telefono:telefono,
      pasword:pasword
    }
    return this.htt.post('http://127.0.0.1:3000/api/register', DataUser);
  }

}
