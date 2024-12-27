
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../Servicios/user.service';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonButtons, IonBackButton, RouterLink]
})
export class LoginPage {

  constructor(private UserService: UserService, private router: Router,
    private loadingController: LoadingController, private alertController: AlertController, private alertCtrl: AlertController) { }

  ngOnInit() { }
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

  loginWithFacebook() {
    console.log('Iniciando sesión con Facebook...');
    // Aquí agregarías la integración con Facebook SDK o Firebase
  }

  // Método para iniciar sesión con Google
  loginWithGoogle() {
    console.log('Iniciando sesión con Google...');
    // Aquí agregarías la integración con Google SDK o Firebase
  }
}
