import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonGrid, IonCol, IonRow, IonFooter, IonImg, IonCardTitle, IonCardHeader, IonCard, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar,IonButton,IonIcon,IonButtons,IonMenu, IonList } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonIcon, IonButtons, IonList,IonItem,IonLabel,IonCard,IonCardHeader,IonCardTitle,
    IonImg, IonFooter,IonRow, IonCol, IonGrid, RouterLink
  ]
})
export class PrincipalPage implements OnInit {

  //user:any;
  constructor() { }


  slideOpts = {
    slidesPerView: 2.2,
    spaceBetween: 10,
  };

  ngOnInit() {
    // this.user = localStorage.getItem('username') esto es para mostar el usuario en una esquinita
    //luego esta variable user la uso en el html <span>user</span>
  }

}

