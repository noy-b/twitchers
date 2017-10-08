// Core
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
// Animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { StreamersComponent } from './streamers/streamers.component';
import { StreamerDetailsComponent } from './streamer-details/streamer-details.component';
// Services
import { SpinnerService } from './spinner/services/spinner.service';
import { StreamersService } from './streamers/services/streamers.service';
import { StreamersResolver } from './streamers/services/streamers-resolver.service';
import { StreamerDetailsService } from './streamer-details/services/streamer-details.service';
// Pipes
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    StreamersComponent,
    StreamerDetailsComponent,
    SpinnerComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    SpinnerService,
    StreamersService,
    StreamersResolver,
    StreamerDetailsService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
