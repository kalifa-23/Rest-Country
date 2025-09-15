import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  darkMode = signal<boolean>(localStorage.getItem('theme') === 'dark');

  constructor() { 
    this.applyTheme(this.darkMode())
  }


  toggleTheme(){
    this.darkMode.update(currentValue => {
      const mode = !currentValue;
      localStorage.setItem('theme', mode ? 'dark' : 'light');
      this.applyTheme(mode);
      return mode;
    })
  }

  private applyTheme(isDark: boolean){
    const theme = isDark ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme)
  }
  
}
  
