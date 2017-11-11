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

  constructor(private dataservice:DataService) { 
    
  }

  ngOnInit() {
  }

  getTranslation(){
    this.dataservice.callWatsonApi(this.toTranslate).subscribe((response) => {
      this.translation = response.translations[0].translation;
    })
  }
}