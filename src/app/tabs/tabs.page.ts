import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    //El constructor del servicio se encarga de validar si el usuario esta logueado
    public authenticate: AuthenticationService
  ) {}
    //creamos el metodo para cerrar sesion
    logout(){
      this.authenticate.signOut();
    }
}
