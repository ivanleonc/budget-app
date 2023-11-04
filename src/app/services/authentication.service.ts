import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as auth from 'firebase/auth';
import { User } from '../../app/user';
import {Firestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Auth, GoogleAuthProvider, UserCredential, signInWithPopup} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public firestore: Firestore = inject(Firestore);
  private auth:Auth = inject(Auth);
  userData:any;

  provider = new GoogleAuthProvider();

  constructor(public ngFireAuth: AngularFireAuth, public router: Router) { 
    this.ngFireAuth.authState.subscribe((user)=>{
      if(user){
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') || '{}');
      }else{
        this.router.navigate(['./login']);
        localStorage.setItem('user', null || '{}');
        JSON.parse(localStorage.getItem('user') || '{}');
      }
    });
  }
  //Inicar sesion con correo y contraseña
  signIn(email:any, password:any){
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }
  //Registrar usuario y contraseña
  registerUser(email:any, password:any){
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }

  //Sign-out
  signOut(){
    return this.ngFireAuth.signOut().then(()=>{
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
    //Sign in con Gmail
    googleAuth(){
      return this.authLogin(new GoogleAuthProvider());
    }
    //Auth providers abre una ventana popup para validar el ingreso con un correo
    async authLogin(provider: auth.AuthProvider):Promise<UserCredential>{
      try{
        const result = await signInWithPopup(this.auth, provider);
        return result;
      } catch(error:any){
        return error;
      }
    }
}
