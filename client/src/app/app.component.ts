import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false,
  template: `
  <router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    localStorage.clear();
    console.log('Local storage cleared on app startup');
  }
}
