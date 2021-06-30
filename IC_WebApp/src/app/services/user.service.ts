import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  //NOTE: firebase properties: para usar el API de AUTH de firebase
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey = 'AIzaSyBttwfzN1QDhBtnj8IgmI0Jl1_KshwQKqM';

  //NOTE importante para tener el token, validarlo 
  userToken!: any;
  userName!: any;

  // Crear nuevo usuario
  // https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[API_KEY]


  // Login
  // https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[API_KEY]


  //NOTE: lo primero que hace el servicio es leerToken del localStorage
  constructor( private http: HttpClient, private database: AngularFireDatabase, ) {
    this.leerToken();
  }

  // el logout es tan simple como quitar del local storage el token
  // ya en FE, se hace logout y se redirecciona a login component
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  // login llama al api de firebase
  login( usuario: User ) {

    //...usuario es pasar toda la data el usuario como js object,
    // más la propiedad para que fb retorne un token
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    //retorna el observable de http, con un pipe para guardar el token de una vez
    // en el local storage, que es el equivalente a estar logueado
    return this.http.post(
      `${ this.url }signInWithPassword?key=${ this.apikey }`,
      authData
    ).pipe(
      map( (resp:any) => {
        this.guardarToken( resp['idToken'] ); //guarda en LS
        let userData;
        this.getUserData(resp['localId']).then(res => {
          userData = <User>res;
          this.saveUsernameToken(userData.name);
        }).catch(err => console.log(err));
        return resp;
      })
    ); 
  }
  
  getUserData(uid: string){
    let promise = new Promise((resolve,reject) =>{
      this.database.database.ref('users').child(uid).once('value').then((snapshot) => {
        if(snapshot.val() !== null){
          resolve(snapshot.val());
        }
        else{
          reject("Not found");
        }
      });
    });
    return promise;
  }

  // NOTE: usa el API para crear un usuario
  nuevoUsuario( usuario: User ) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }signUp?key=${this.apikey}`,
      authData
    ).pipe(
      map( (resp:any) => {
        this.saveUserDB(usuario, resp['localId'])
        //this.guardarToken( resp['idToken'] ); //al crearlo lo guarda en el LS
        //this.saveUsernameToken(usuario.name);
        return resp;
      })
    );
  }

  saveUserDB(user: User, uid: string){
    const _user = {
      email: user.email,
      name: user.name,
    }
    this.database.database.ref('users/' + uid).set(_user).then(res => {console.log("success")}).catch(err => {console.log("Error")});
  }

  saveUsernameToken(name: string){
    this.userName = name;
    localStorage.setItem('username',this.userName);
  }

  readUsernameToken(){
    if(localStorage.getItem('username')){
      this.userName = localStorage.getItem('username');
    }
    else{
      this.userName = '';
    }
    return this.userName;
  }

  //guarda el token y el tiempo en el LS
  // importante, esto es para simular el manejo del token, el 
  // backend debería de manejar si el token está o no activo aún
  private guardarToken( idToken: string ) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds( 3600 );
    localStorage.setItem('expira', hoy.getTime().toString() );
  }

  // si está en local storage, lo asigna al atributo
  // sino, va en nulo para que vaya por uno nuevo
  leerToken() {
    if ( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  //valida que el token exista
  estaAutenticado(): boolean {
    if ( this.userToken.length < 2 ) {
      return false;
    }

    //obtiene la fecha y hora de expiración
    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    // si es válido o no
    if ( expiraDate > new Date() ) {
      return true;
    } else {
      return false;
    }


  }
}
