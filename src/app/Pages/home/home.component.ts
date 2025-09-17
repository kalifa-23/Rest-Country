import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { Country } from '../../Interface/country';
import { ButtonComponent } from '../../Components/button/button.component';
import { CountriesService } from '../../Services/countries.service';
import { CountryCardComponent } from '../../Components/country-card/country-card.component';
import { RegionBarComponent } from '../../Components/region-bar/region-bar.component';
import { SearchBarComponent } from '../../Components/search-bar/search-bar.component';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { PageloadService } from '../../pageload.service';
import { Subscription } from 'rxjs';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-home',
  imports: [
    CountryCardComponent,
    RegionBarComponent,
    SearchBarComponent,
    NavbarComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  countryServices = inject(CountriesService);

  countries = signal<Country[]>([]);
  isLoading = signal<boolean>(false);
  errorMsg = signal<string>('');
  searchInput = signal<string>('');
  region = signal<string>('');

  private subscription!: Subscription;

  filteredCountries = computed(() => {
    return this.countries()
      .filter((country) => {
        const matchesSearch = country.name.common
          .toLowerCase()
          .includes(this.searchInput().toLowerCase());

        const matchesRegion = this.region()
          ? country.region === this.region()
          : true;

        return matchesSearch && matchesRegion;
      })
      .sort((a, b) => a.name.common.localeCompare(b.name.common));
  });

  ngOnInit(): void {
    this.isLoading.set(true);
    this.subscription = this.countryServices.getAllCountry().subscribe({
      next: (data) => {
        this.countries.set(data);
        this.isLoading.set(false);
        console.log(data);
      },
      error: (err) => {
        this.errorMsg.set(err || 'Something went wrong!');
        this.isLoading.set(false);
      },
    });
  }

  onSearch(term: string) {
    this.searchInput.set(term);
  }

  onRegionSelect(region: string) {
    this.region.set(region);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
