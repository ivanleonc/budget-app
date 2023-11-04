import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController, ActionSheetController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../app/user';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user = {} as User;

  constructor(
    public authenticate: AuthenticationService,
    public toastCtrl: ToastController,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  register(user:User){
    //metodo para crear usuario en firebase
    this.authenticate.registerUser(user.email, user.password).then((result:any)=>{
      //si el usuario es creado correctamente muestra un mensaje de redirecciona
      this.showMessage('Usuario registrado');
      this.router.navigate(['./login']);
    }, err=>{
      this.showMessage('Hubo un error: '+err);
    });
  }

  showMessage(message:string){
    this.toastCtrl.create({
      message: message,
      duration: 2000
    }).then(toast => toast.present());
  }

  ngOnInit() {
  }

}
