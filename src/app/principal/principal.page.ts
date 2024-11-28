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

  //user:any;
  constructor() { }

<<<<<<< HEAD
  slideOpts = {
    slidesPerView: 2.2,
    spaceBetween: 10,
  };

  
=======

>>>>>>> 887f1a98cd972331bbb5a58537b5afd4817b22c1
  ngOnInit() {
    // this.user = localStorage.getItem('username') esto es para mostar el usuario en una esquinita
    //luego esta variable user la uso en el html <span>user</span>
  }

}

