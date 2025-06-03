import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService extends BaseService{
  protected override url: string = 'Images';
}
