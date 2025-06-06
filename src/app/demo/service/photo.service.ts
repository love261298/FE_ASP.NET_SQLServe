import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Image } from 'src/app/demo/api/image';

@Injectable({
	providedIn: 'root',
})
export class PhotoService {

	constructor(private http: HttpClient) { }

	getImages() {
		return this.http.get<any>('assets/demo/data/photos.json')
			.toPromise()
			.then(res => res.data)
			.then(data => data);
	}

	getAvarta() {
		return this.http.get<any>('assets/demo/data/avatar.json')
			.toPromise()
			.then(res => res.data)
			.then(data => data);
	}

	getImagesBlog() {
		return this.http.get<any>('assets/demo/data/imagesBlog.json')
			.toPromise()
			.then(res => res.data)
			.then(data => data);
	}
}
