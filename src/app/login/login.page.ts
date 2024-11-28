import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonInputPasswordToggle } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { UserService } from '../Servicios/user.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonButton ,IonInput, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class LoginPage {
  constructor(private userService: UserService, private alertCtrl: AlertController, private router: Router) {}

  // Método para iniciar sesión
  loginUser(correo: any, pasword: any) {
    // Validar campos vacíos
    if (!correo.value || !pasword.value) {
      this.showAlert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    this.userService.loginUser(correo.value, pasword.value).subscribe({
      next: async (datos: any) => {
        console.log('Credenciales correctas', datos.message);
        this.showAlert('Éxito', 'Inicio de sesión exitoso');
        this.router.navigateByUrl('/principal');
      },
      error: async (error: any) => {
        console.error('Credenciales incorrectas', error.message);
        this.showAlert('Error', 'Correo o contraseña incorrectos.');
      },
    });
  }

  // Método para mostrar alertas
  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
