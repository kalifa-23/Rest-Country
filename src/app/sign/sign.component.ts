import { Component, inject, signal } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign',
  imports: [ReactiveFormsModule],
  templateUrl: './sign.component.html',
  styleUrl: './sign.component.css',
})
export class SignComponent {
  auth = inject(AuthService)
  router = inject(Router)

  isVisible = signal<boolean>(false);

  signForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onSignup(){
    const {username, email, password} = this.signForm.value;
    const res = this.auth.signup(username!, email!, password!);

    if(res.ok){
      this.router.navigateByUrl('/login');
    }else{
      alert(res.message || 'Signup Failed');
    }
  }

  showPassword() {
    this.isVisible.update((currentVal) => {
      const visible = !currentVal;
      return visible;
    });
  }
}
