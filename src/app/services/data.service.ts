import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class DataService {

  constructor(public http:Http) { 
    console.log('Connected');
  }

  callWatsonApi(toTranslate){
    return this.http.get('http://ianmckie.com/watson/watson.php?toTranslate='+encodeURIComponent(toTranslate)+'&source=en&target=es')
      .map(res => res.json());
  }


}
