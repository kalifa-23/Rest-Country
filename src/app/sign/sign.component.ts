import { Component, signal } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-sign',
  imports: [ReactiveFormsModule],
  templateUrl: './sign.component.html',
  styleUrl: './sign.component.css',
})
export class SignComponent {
  isVisible = signal<boolean>(false);

  signForm = new FormGroup({
    userusername: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  showPassword() {
    this.isVisible.update((currentVal) => {
      const visible = !currentVal;
      return visible;
    });
  }
}
