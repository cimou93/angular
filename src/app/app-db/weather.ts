import {Headers, Http, RequestOptions, Response, URLSearchParams} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherDb {

    constructor(private http: Http) {

    }

    public getWeather() {
        const url = 'http://api.openweathermap.org/data/2.5/forecast?id=2464648&appid=4228994359f7c4b1998c3ab888efdb5b&lang=fr&units=metric';

        return this.http.get(url).map((data: Response) => data.json());

    }
}
