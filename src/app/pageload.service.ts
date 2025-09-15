import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageloadService {

  constructor() { }

  isPageLoad = signal<boolean>(true);
}
