import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http'
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TranslationComponent } from './components/translation/translation.component';

import { DataService } from './services/data.service';

declare var jquery:any;
declare var $ :any;

@NgModule({
  declarations: [
    AppComponent,
    TranslationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
