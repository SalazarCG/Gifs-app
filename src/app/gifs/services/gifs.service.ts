import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({ providedIn: 'root' })
export class GifsService {
  private _tagsHistory: String[] = [];

  private apiKey: String = 'YZxeT3T2CEeNModMo4oQqFIwS9OyZdfe';

  constructor(private http: HttpClient) {}

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    //Si incluye el tag nuevo en minúscula se elimina

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0, 10);
  }

  searchTag(tag: string):void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    this.http.get(
      'https://api.giphy.com/v1/gifs/search?api_key=YZxeT3T2CEeNModMo4oQqFIwS9OyZdfe&q=valorant&limit=10'
    ).subscribe( resp => {
      console.log(resp);
    } );

  }
}

