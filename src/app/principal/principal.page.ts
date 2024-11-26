import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PrincipalPage implements OnInit {

  //user:any;
  constructor() { }


  ngOnInit() {
    // this.user = localStorage.getItem('username') esto es para mostar el usuario en una esquinita
    //luego esta variable user la uso en el html <span>user</span>
  }

}

