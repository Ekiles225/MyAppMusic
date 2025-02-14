import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonInput, IonButton
 } from '@ionic/angular/standalone';
import { UserService } from '../Servicios/user.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonContent,CommonModule, FormsModule, IonInput, IonButton, IonInput
  ]
})
export class RegistroPage implements OnInit {

  constructor(private loadingController: LoadingController, private userService:UserService, private alertCtrl: AlertController, private router: Router) { 
   
  }

  ngOnInit() {
  }

  //metodo que consume el metodo del servicio para registrar
  registerUser(nombre:any, apellido:any, correo:any, telefono:any, pasword:any){
    this.userService.registerUser(nombre.value, apellido.value, correo.value, telefono.value, pasword.value).subscribe({
        next: (datos:any) =>{   
          this.showAlert('Éxito', 'Cuenta creada');
          this.router.navigateByUrl('/login');
        }, 
        error:(error:any) =>{
          console.log('Error al registrar usuario', error.message);
          this.showAlert('Error', 'Ups ha pasado algo, vuelva a intentarlo');

        }
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
}
