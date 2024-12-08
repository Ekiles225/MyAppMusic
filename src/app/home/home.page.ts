import { Component, Renderer2  } from '@angular/core';
import {IonButton, IonContent} from '@ionic/angular/standalone';
import { ActionSheetController } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html', 
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonContent, RouterLink],
})

export class HomePage {
  constructor(private renderer: Renderer2, private routerLink: Router) {
  }
 

  ngOnInit() {
  
  }

  

}
