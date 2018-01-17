import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Quizzzy';

  constructor(private router: Router) {
    console.log(localStorage);
   }

  onLogout(): void {
    localStorage.clear();
  }

}
