import { Component, inject, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validator,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { ThemeService } from '../../Services/theme.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  auth = inject(AuthService);
  router = inject(Router);
  theme = inject(ThemeService)

  isVisible = signal<boolean>(false)

  loginForms: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });


  onLogin() {
    const { username, password } = this.loginForms.value;
    if (this.auth.login(username!, password!)) {
      console.log(this.loginForms.value)
      this.router.navigateByUrl('/home');
    } else {
      alert('Invalid Credentails');
    }
  }

  showPassword(){
    this.isVisible.update(currentVal => {
      const visible = !currentVal
      return visible;
    })
  }


}
