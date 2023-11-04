import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController, ActionSheetController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../app/user';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {} as User;

constructor(
  public authenticate: AuthenticationService,
  public toastCtrl: ToastController,
  private route: ActivatedRoute,
  private router: Router
) { }

login(user: User){
  //metodo para ingresar (recibe un parametro del tipo Usuario)
  this.authenticate.signIn(user.email, user.password).then((result:any)=>{
    //si las credenciales son correctas, muestra mensaje de bienvenida y redirije a tabs
    this.showMessage('¡Bienvenido '+result.user._delegate.email+'!');
    this.router.navigate(['tabs']);
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
loginGoogleAuth(){
  this.authenticate.googleAuth().then ((result:any)=>{
    console.log(result);
    //si credenciales correctas
    this.showMessage('¡Bienvenido '+result.user.displayName+'!');
    this.router.navigate(['tabs']);
  }, err=>{
    this.showMessage('Hubo un error: '+err);
  });
}
ngOnInit() {
}

}

