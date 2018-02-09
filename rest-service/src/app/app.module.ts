import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import{FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';


import { AppComponent } from './app.component';
import { UserService }  from  "./services/user.service";
import { StyleFinderService }  from  "./services/style-finder.service";
import { StyleFinderComponent } from './style-finder/style-finder.component';


@NgModule({
  declarations: [
    AppComponent,
    StyleFinderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [UserService,StyleFinderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
