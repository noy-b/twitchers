import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/filter';

import { SpinnerService } from './spinner/services/spinner.service';

import { routeAnim, slideUpDown } from './_animations';

@Component({
  selector: 'tvrs-root',
  templateUrl: './app.component.html',
  animations: [routeAnim, slideUpDown]
})
export class AppComponent implements OnInit, OnDestroy {

  private showSpinner: Boolean;
  private spinnerSub: Subscription;

  constructor(
    private router: Router,
    private spinnerService: SpinnerService
  ) { }

  // Listen to outlet changes (filtered to NavigationEnd) and return the current state param
  getAnimation(outlet) {
    return outlet.activatedRouteData.state;
  }

  // Hooks Life Cycle
  ngOnInit() {
    // Spinner shows on any http request
    this.spinnerSub = this.spinnerService.spinner.subscribe((val: Boolean) => {
      this.showSpinner = val;
    });
  }
  ngOnDestroy() {
    this.spinnerSub.unsubscribe();
  }
}
