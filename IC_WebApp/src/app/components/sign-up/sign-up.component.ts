import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user!: User;
  recordarme = false;
  signUpForm!: FormGroup;

  constructor( private userService: UserService,
               private router: Router,
               private fb: FormBuilder ) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      name: ['', Validators.required]
    })
  }

  get nameInvalid(){
    return this.signUpForm.get('name')?.invalid && this.signUpForm.get('name')?.touched;
  }

  get emailInvalid(){
    return this.signUpForm.get('email')?.invalid && this.signUpForm.get('email')?.touched;
  }

  get passwordInvalid(){
    return this.signUpForm.get('password')?.invalid && this.signUpForm.get('password')?.touched;
  }

  onSubmit() {

    if ( this.signUpForm.invalid ) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    })

    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think'
    })

    Swal.showLoading();


    this.userService.nuevoUsuario( this.signUpForm.value )
      .subscribe( resp => {

        console.log(resp);
        Swal.close();

        if ( this.recordarme ) {
          localStorage.setItem('email', this.user.email);
        }

        this.router.navigateByUrl('/home');

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
