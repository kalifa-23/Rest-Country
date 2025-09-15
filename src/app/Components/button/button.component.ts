import { Component, inject } from '@angular/core';
import { ThemeService } from '../../Services/theme.service';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {

  theme = inject(ThemeService);
}
