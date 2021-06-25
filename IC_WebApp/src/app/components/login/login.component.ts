import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user!: User;
  recordarme = false;
  loginForm!: FormGroup;

  constructor( private userService: UserService,
               private router: Router,
               private fb: FormBuilder ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  get passwordInvalid(){
    return this.loginForm.get('password')?.invalid && this.loginForm.get('password')?.touched;
  }

  get emailInvalid(){
    return this.loginForm.get('email')?.invalid && this.loginForm.get('email')?.touched;
  }

  onSubmit() {
    // si el form está ok
    if (  this.loginForm.invalid ) { return; }

    //alert de loading
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    //hace el login con el servicio
    this.userService.login( this.loginForm.value )
      .subscribe( resp => {
        console.log(resp);
        Swal.close();

        if ( this.recordarme ) {
          localStorage.setItem('email', this.loginForm.get('email')?.value);
        }
        this.router.navigateByUrl('/home');
        // si da error
      }, (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar',
          text: err.error.error.message
        });
      });

  }

}
