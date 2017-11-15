import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Jsonp } from '@angular/http/src/http';

import * as jQuery from 'jquery';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TranslationComponent implements OnInit {

  toTranslate:string = '';
  translation:string = '';
  primaryLocale:string = 'en';
  secondaryLocale:string = 'es';
  amount:number = 20; 

  storageItems:JSON;

  // Country Listings
  countries: any[] = [
    { id: 1, code: 'es', label: 'To Spanish'},
    { id: 2, code: 'de', label: 'To German'},
    { id: 3, code: 'fr', label: 'To French'},
  ];

  // Error message values
  errorBody:string = 'This translation is already pinned';
  errorTitle:string = 'Error';

  constructor(private dataservice:DataService) {}

  ngOnInit() {
    if(typeof localStorage !== undefined && typeof localStorage.getItem('pinnedTranslations') !== 'undefined'){
      this.getLSTranslations();  
    }

    // Initialise popover for button error
    $('.btn-primary').popover({trigger: "manual"});
  }

  /* 
   * Bound to primary input field. Once typing begins it calls the dataservice.
   * Once returned, the value of the translation is set to the response
   * 
   */

  getTranslation(){

    // If translation is empty reset translation input
    if(this.toTranslate === ''){
      this.translation = '';  
    }
    else{
      this.dataservice.callWatsonApi(this.toTranslate, this.primaryLocale, this.secondaryLocale).subscribe((response) => {
        this.translation = response.translations[0].translation;
      });  
    }
  }

  /* 
   * Get translations from localStorage
   * 
   */

  getLSTranslations(){
    this.storageItems = JSON.parse(localStorage.getItem('pinnedTranslations'));
  }

  /* 
   * When the pin translation button is pressed add the current translation to localStorage
   * 
   */

  pinTranslation(){

    // Return if there is nothing in translation
    if(this.translation === ''){
      this.errorBody = "Nothing to pin";
      return;
    }

    // Get current pinned translations
    let currentTranslation = localStorage.getItem('pinnedTranslations') !== null ? JSON.parse(localStorage.getItem('pinnedTranslations')) : [];

    // Loop through existing items and check if already exists
    for(var i = 0;i<currentTranslation.length;i++) { 
      if(currentTranslation[i].translation.value === this.translation){

        // Show popover to warn people about existing translation
        $('.btn-primary').popover('show');
        
        return;
      }
    } 
    
    // Push current translation
    currentTranslation.push({ "toTranslate":{ "locale" : this.primaryLocale, "value": this.toTranslate } , "translation":{ "locale" : this.secondaryLocale, "value": this.translation } });

    this.storageItems = currentTranslation;

    // Add back to pinnedTranslations
    localStorage.setItem('pinnedTranslations', JSON.stringify(currentTranslation));
  }
}