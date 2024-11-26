import { Component } from '@angular/core';
import {IonButton, IonContent} from '@ionic/angular/standalone';
import { ActionSheetController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { logoIonic } from 'ionicons/icons';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html', 
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent],
})

export class HomePage {
  constructor(private actionSheetController: ActionSheetController, private routerLink: Router) {
    addIcons({ logoIonic });
  }
 

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Iniciar sesión con',
      buttons: [
        {
          text: 'Google',
          handler: () => {
            console.log('Iniciar con Google');
          },
        },
        {
          text: 'Facebook',
          handler: () => {
            console.log('Iniciar con Facebook');
          },
        },
        {
          text: 'Registrarme',
          handler: () => {
            console.log('Crear cuenta');
            this.routerLink.navigate(['/registro']);// esto es el estilo  para la navegacion en el ts
            // <a href="" [routerLink]="['/pagina1']" >page1</a> // este paa el html
          },
        },
        {
          text: 'Ya tengo cuenta',
          handler: () => {
            console.log('Iniciar sesión con correo electrónico');
            this.routerLink.navigate(['/login']);
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }
}
