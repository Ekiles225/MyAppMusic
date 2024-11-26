import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonItem, IonInput, IonButton, IonInputPasswordToggle } from '@ionic/angular/standalone';
import { eye, lockClosed } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { UserService } from '../Servicios/user.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonInputPasswordToggle, IonContent,CommonModule, FormsModule, IonItem, IonInput, IonButton, IonInput]
})
export class RegistroPage implements OnInit {

  constructor(private userService:UserService) { 
    addIcons({ eye, lockClosed });
  }

  ngOnInit() {
  }

  //metodo que consume el metodo del servicio para registrar
  registerUser(nombre:any, apellido:any, correo:any, telefono:any, pasword:any){
    this.userService.registerUser(nombre.value, apellido.value, correo.value, telefono.value, pasword.value).subscribe({
        next: (datos:any) =>{
          debugger

          //esto es en el loguin solo que no lo tengo echo
          //esto es para verificar que eres tu, son variables locales para usar
          // localStorage.setItem('toke', datos.toke)
          // localStorage.setItem('id', datos.dataUser.id)
          // localStorage.setItem('toke', datos.dataUser.user)



          console.log('Usuario registrado con exito');
        }, 
        error:(error:any) =>{
          console.log('Error al registrar usuario', error.message);
          debugger
        }

    });
  }
//FIN DEL METODO  




}
