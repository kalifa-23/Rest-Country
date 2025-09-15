import { Component, inject, Input } from '@angular/core';
import { Country } from '../../Interface/country';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-country-card',
  imports: [DecimalPipe],
  templateUrl: './country-card.component.html',
  styleUrl: './country-card.component.css'
})
export class CountryCardComponent {
  @Input() country!: Country;

  router = inject(Router);

  navigateToDetail() {
    this.router.navigate(['/details', this.country.cca3]);
  }
}
