import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StreamersComponent } from './streamers/streamers.component';
import { StreamerDetailsComponent } from './streamer-details/streamer-details.component';
import { StreamersResolver } from './streamers/services/streamers-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'streamers/:streamersStatus',
    component: StreamersComponent,
    resolve: {
      streamers: StreamersResolver
    },
    children: [
      {
        path: ':streamersName',
        component: StreamerDetailsComponent,
        outlet: 'details'
      }
    ],
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
