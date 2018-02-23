import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import{FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { NgxCarouselModule } from 'ngx-carousel';


import { AppComponent } from './app.component';
import { UserService }  from  "./services/user.service";
import { StyleFinderService }  from  "./services/style-finder.service";
import { StyleFinderComponent } from './style-finder/style-finder.component';
import { PdppageComponent } from './pdppage/pdppage.component';
import { imageReducer } from './reducer/imagereducer';
import { StoreModule,Store } from '@ngrx/store';


const appRoutes: Routes = [
  { path: 'images/:Id', component: PdppageComponent },
  { path: 'finder', component: StyleFinderComponent },
  { path: '',
    redirectTo: '/finder',
    pathMatch: 'full'
  },

  
];

@NgModule({
  declarations: [
    AppComponent,
    StyleFinderComponent,
    PdppageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    NgxCarouselModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot({ imagestate: imageReducer}), 
  ],
  providers: [UserService,StyleFinderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
