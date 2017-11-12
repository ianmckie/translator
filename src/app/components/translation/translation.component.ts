import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TranslationComponent implements OnInit {

  toTranslate:string = '';
  translation:string = '';
  primary:string = 'en';
  secondary:string = 'es';
  countries: any[] = [
    { id: 1, code: 'en', label: 'English'},
    { id: 2, code: 'es', label: 'Spanish'},
    { id: 3, code: 'de', label: 'German'},
    { id: 4, code: 'fr', label: 'French'},
  ];

  constructor(private dataservice:DataService) { 
    
  }

  ngOnInit() {
  }

  getTranslation(language){
    // If translation is empty reset translation input
    if(this.toTranslate === ''){
      this.translation = '';  
    }
    else{
      this.dataservice.callWatsonApi(this.toTranslate, this.primary, this.secondary).subscribe((response) => {
        this.translation = response.translations[0].translation;
        console.log(this.primary)
      });  
    }
  }

  changeLanguage(language, languageAlt){

  }
}