import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/filter';

import { SpinnerService } from './spinner/services/spinner.service';

import { routeAnim, slideUpDown } from './animations';

@Component({
  selector: 'tvrs-root',
  templateUrl: './app.component.html',
  animations: [routeAnim, slideUpDown]
})
export class AppComponent implements OnInit, OnDestroy {

  private isHome = true;
  private showSpinner: Boolean;

  private spinnerSub: Subscription;
  private routerSub: Subscription;

  constructor(
    private router: Router,
    private spinnerService: SpinnerService
  ) { }
  ngOnInit() {
    // Listen to route changes (filtered to NavigationEnd) and set isHome accordingly
    this.routerSub =
      this.router.events
        .filter(e => e instanceof NavigationEnd)
        .subscribe((e) => {
          this.isHome = this.router.isActive('', true) ? true : false;
        });
    // Spinner shows on any http request
    this.spinnerSub = this.spinnerService.spinner.subscribe((val: Boolean) => {
      this.showSpinner = val;
    });
  }
  ngOnDestroy() {
    this.routerSub.unsubscribe();
    this.spinnerSub.unsubscribe();
  }
}
