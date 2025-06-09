import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService extends BaseService{
  protected override url: string = 'Images';

  searchImage(imageUrl: any): Observable<any> {
    const params = new HttpParams().set('imageUrl', imageUrl);
    return this.http.get<any>(`${this.apiUrl}/${this.url}/Search`, { params });
  }
}
