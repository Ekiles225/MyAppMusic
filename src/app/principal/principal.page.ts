import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonGrid, IonMenuButton, IonCol, IonRow, IonFooter, IonImg, IonCardTitle, IonCardHeader, IonCard, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar,IonButton,IonIcon,IonButtons,IonMenu, IonList } from '@ionic/angular/standalone';





@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonIcon, IonButtons, IonMenu, IonList,IonItem,IonLabel,IonCard,IonCardHeader,IonCardTitle,
    IonImg, IonFooter,IonRow, IonCol, IonMenuButton, IonGrid
  ]
})
export class PrincipalPage implements OnInit {

  constructor() { }

  slideOpts = {
    slidesPerView: 2.2,
    spaceBetween: 10,
  };

  
  ngOnInit() {
  }

}
