import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../Interface/country';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  constructor() {}

  baseUrl = 'https://restcountries.com/v3.1';

  http = inject(HttpClient);

  getAllCountry(): Observable<Country[]> {
    return this.http.get<Country[]>(
      `${this.baseUrl}/all?fields=name,cca3,capital,region,population,flags`
    );
  }

  getCountryByCode(code: string): Observable<Country> {
    return this.http.get<Country>(
      `${this.baseUrl}/alpha/${code}?fields=name,tld,currencies,capital,region,subregion,languages,borders,population,flags`
    );
  }

  getBordersByCodes(codes: string[]): Observable<Country[]> {
    return this.http.get<Country[]>(
      `${this.baseUrl}/alpha?codes=${codes.join(',')}`
    );
  }
}
