import { Injectable } from '@angular/core';

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  async loginWithGoogle() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Usuario autenticado:', result.user);
      return result.user;
    } catch (error) {
      console.error('Error en la autenticación con Google:', error);
      throw error;
    }
  }
}
