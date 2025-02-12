import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,IonInput, IonButton,IonIcon } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../Servicios/user.service';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonInput,IonContent, CommonModule, FormsModule, RouterLink]
})


export class LoginPage {

  constructor(private UserService: UserService, private router: Router,
    private loadingController: LoadingController, private alertController: AlertController, private alertCtrl: AlertController) { }

  ngOnInit() { }

  // Método para iniciar sesión con correo y contraseña
  async loginUser(email: any, password: any) {
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      spinner: 'circles',
    });

    loading.present();

    this.UserService.loginUser(email.value, password.value).subscribe({
      next: async (datos: any) => {
        localStorage.setItem('token', datos.token);
        localStorage.setItem('id', datos.dataUser.id);
        localStorage.setItem('nombre', datos.dataUser.user);
        loading.dismiss();
        this.showAlert('Éxito', 'Inicio de sesión exitoso');
        this.router.navigateByUrl('principal');
      },
      error: async (e: any) => {
        loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Error',
          message: e.error.message,
          buttons: ['OK'],
        });
        await alert.present();
      },
    });
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Método para iniciar sesión con Google
  async loginWithGoogle() {
    console.log('Iniciando sesión con Google...');
  
    try {
      // Llamar a la función definida en index.html
      const loginFunction = (window as any).loginWithGoogle;
      
      if (typeof loginFunction === 'function') {
        await loginFunction();
        console.log('Sesión iniciada con éxito');
        this.showAlert('Éxito', 'Inicio de sesión exitoso');
        this.router.navigateByUrl('principal');
      } else {
        console.error('La función loginWithGoogle no está definida en window.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      this.showAlert('Error', 'Inicio de sesión fallido');
    }
  }

  async loginWithFacebook() {
    console.log('Iniciando sesión con Facebook...');
  
    try {
      // Llamar a la función definida en index.html
      const loginFunction = (window as any).loginWithGoogle;
      
      if (typeof loginFunction === 'function') {
        await loginFunction();
        console.log('Sesión iniciada con éxito');
      } else {
        console.error('La función loginWithGoogle no está definida en window.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  }
}  
  

