import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StreamersComponent } from './streamers/streamers.component';
import { StreamersResolver } from './_resolvers/streamers-resolver.service';
import { StreamerDetailsComponent } from './streamer-details/streamer-details.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      state: 'home'
    }
  },
  {
    path: ':streamersStatus',
    component: StreamersComponent,
    data: {
      state: 'streamers'
    },
    resolve: {
      streamers: StreamersResolver
    },
    children: [
      {
        path: ':streamerName',
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
