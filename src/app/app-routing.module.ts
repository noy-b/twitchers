import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StreamersComponent } from './streamers/streamers.component';
import { StreamersResolver } from './streamers/services/streamers-resolver.service';
import { StreamerDetailsComponent } from './streamer-details/streamer-details.component';
import { StreamerDetailsResolver } from './streamer-details/services/streamer-details-resolver.service';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      state: 'home'
    }
  },
  {
    path: 'streamers/:streamersStatus',
    component: StreamersComponent,
    data: {
      state: 'streamers'
    },
    resolve: {
      streamers: StreamersResolver
    },
    children: [
      {
        path: ':streamersName',
        component: StreamerDetailsComponent,
        resolve: {
          streamers: StreamerDetailsResolver
        },
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
