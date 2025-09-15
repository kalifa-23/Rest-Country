import { Component, Output, signal, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-region-bar',
  imports: [],
  templateUrl: './region-bar.component.html',
  styleUrl: './region-bar.component.css'
})
export class RegionBarComponent {
  @Output() selectRegion = new EventEmitter();

  display = signal<boolean>(false);
  selectedRegion = signal<string>('Filter by Region');
  regions: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  onDisplay() {
    this.display.update((c) => !c);
  }

  onChange(region: string) {
   this.selectedRegion.set(region);
    this.selectRegion.emit(region);
    this.display.set(false); 
  }
}
