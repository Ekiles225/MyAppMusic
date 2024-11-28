import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonItem, IonInput, IonButton, IonInputPasswordToggle } from '@ionic/angular/standalone';
import { eye, lockClosed } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { UserService } from '../Servicios/user.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonInputPasswordToggle, IonContent,CommonModule, FormsModule, IonItem, IonInput, IonButton, IonInput]
})
export class RegistroPage implements OnInit {

  constructor(private userService:UserService, private alertCtrl: AlertController, private router: Router) { 
    addIcons({ eye, lockClosed });
  }

  ngOnInit() {
  }

  //metodo que consume el metodo del servicio para registrar
  registerUser(nombre:any, apellido:any, correo:any, telefono:any, pasword:any){
    this.userService.registerUser(nombre.value, apellido.value, correo.value, telefono.value, pasword.value).subscribe({
        next: (datos:any) =>{
          console.log('Usuario registrado con exito');
          this.showAlert('Éxito', 'Cuenta creada');
          this.router.navigateByUrl('/principal');
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
//FIN DEL METODO  




}
