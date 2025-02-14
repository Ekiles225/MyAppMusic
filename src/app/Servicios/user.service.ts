import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private htt:HttpClient) { }

  private apiUrl = 'http://localhost:3000/api'; // URL base de la API

  //metodo d registro de usuario que no tiene cuenta 
  registerUser(nombre:string, apellido:string, correo:any, telefono:string, pasword:any) {

    const DataUser = {
      nombre:nombre,
      apellido:apellido,
      correo:correo,
      telefono:telefono,
      pasword:pasword
    }
    return this.htt.post(`${this.apiUrl}/register`, DataUser);
  }

  loginUser(correo:any, pasword:any){
    const DataUser = {
      correo:correo,
      pasword:pasword
    }
    return this.htt.post(`${this.apiUrl}/login`, DataUser);
  }

  getOneUser(id:string){
    
    const header = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.htt.get(`${this.apiUrl}/user/${id}`, { headers: header });
  }

  //sobre las redes sociales 
  registerUserWithGoogleOrFacebook(userData: any) {
    return this.htt.post(`${this.apiUrl}/register-social`, userData);
  }

  async loginWithGoogleOrFacebook() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const userData = {
        nombre: user.displayName || 'Usuario sin nombre',
        correo: user.email,
        foto: user.photoURL
      };

      // Verificar si el usuario ya existe
      this.getOneUser(user.email).subscribe({
        next: (data: any) => {
          console.log(' Usuario encontrado en la base de datos:', data);
          localStorage.setItem('id', data.user.id);
        },
        error: (err) => {
          if (err.status === 404) {
            console.log('⚠️ Usuario no encontrado, registrándolo...');
            this.registerUserWithGoogleOrFacebook(userData).subscribe({
              next: (res: any) => {
                console.log('✅ Usuario registrado con éxito:', res);
                localStorage.setItem('id', res.user.id);
              },
              error: (error) => {
                console.error(' Error al registrar el usuario:', error);
              }
            });
          }
        }
      });
    }
  }
  }

  

