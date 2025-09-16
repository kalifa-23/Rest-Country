import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from '../../Services/countries.service';
import { DecimalPipe, Location, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Country } from '../../Interface/country';
import { ButtonComponent } from '../../Components/button/button.component';
import { AuthService } from '../../Services/auth.service';
import { PageloadService } from '../../pageload.service';
import {  Subscription } from 'rxjs';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, DecimalPipe, NavbarComponent],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  Object = Object;
  country = signal<Country | null>(null);
  borders = signal<Country[]>([]);
  isLoading = signal<boolean>(false);
  error = signal<string>('');
  imageUrl = signal<string>('assets/call-made.svg');
  pageLoad = inject(PageloadService);

  constructor(
    private route: ActivatedRoute,
    private countryService: CountriesService,
    private location: Location,
    private router: Router,
  ) {}
  
  private subscription!: Subscription

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const countryCode = params.get('countryId');
      if (countryCode) {
        this.fetchCountry(countryCode);
      }
    });
  }

  fetchCountry(countryCode: string) {
    this.isLoading.set(true);

    this.subscription = this.countryService.getCountryByCode(countryCode).subscribe({
      next: (countryData) => {
        this.country.set(countryData);
        this.isLoading.set(false);

        if (countryData.borders?.length) {
          this.countryService.getBordersByCodes(countryData.borders).subscribe({
            next: (borderCountries) => {
              this.borders.set(borderCountries);
            },
            error: (err) => {
              console.error('Error fetching border countries:', err);
              this.borders.set([]);
            },
          });
        } else {
          this.borders.set([]);
        }
      },
      error: (err) => {
        this.error.set(err || 'Something Went Wrong!');
        this.isLoading.set(false);
      },
    });
  }

  goToBack() {
    this.location.back();
  }

  navigateToDetail(code: string) {
    this.router.navigate(['/details', code]);
  }


  ngOnDestroy(): void {
     if(this.subscription){
      this.subscription.unsubscribe()
     } 
  }
}
