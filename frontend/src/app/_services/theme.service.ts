import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {Observable} from "rxjs/Observable"
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ThemeService {

    themes: Observable<any[]>;
    private _themes: BehaviorSubject<any[]>;
    private dataStore: {
        themes: any[]
    };
    
    success = undefined;

    constructor(private http: Http) {
        this.dataStore = { themes: [] };
        this._themes = <BehaviorSubject<any[]>>new BehaviorSubject([]);
        this.themes = this._themes.asObservable();
    }

    headers = new Headers({"Content-Type": "application/json"});
    options = new RequestOptions({ headers: this.headers });

    url = 'http://localhost:8081/';
    
    getAll() {
        return this.http.get(this.url +'get_topics')
            .map((response: Response) => response.json())
            .catch(this.handleError)
            .subscribe(data => {
                this.dataStore.themes = data;
                this._themes.next(Object.assign({}, this.dataStore).themes);
            });
    }

    create(theme, disciplineName) {
        this.success = undefined;

        let name = theme.name;

        this.http.post(this.url + 'create_topic', JSON.stringify(theme), this.options)
        .map((response: Response) => response.json())
        .catch(this.handleError)
        .subscribe(data => {
            console.log(data);
            data.success = JSON.parse(data.success);
            this.success = data.success;
            if(data.success) { 
                this.dataStore.themes.push({id: data.id, topic: name, discipline: disciplineName});
                console.log(this.dataStore.themes);
                this._themes.next(Object.assign({}, this.dataStore).themes);
            }
          });
    }

    update(theme) {
        this.success = undefined;

        let update = {
            id: theme.id,
            discipline: theme.discipline,
            topic: theme.name
        };

        this.http.put(this.url + 'edit_topic', JSON.stringify(theme), this.options)
        .map(response => response.json())
        .catch(this.handleError)
        .subscribe(data => {
            console.log(data);
            data.success = JSON.parse(data.success);
            this.success = data.success;
            if(data.success) { 
                this.dataStore.themes.forEach((t, i) => {
                    if (t.id === update.id) { this.dataStore.themes[i] = update; }
                });
                this._themes.next(Object.assign({}, this.dataStore).themes);
            }
        });
    }

    delete(theme) {
        this.success = undefined;

        this.http.delete(this.url + 'delete_topic', new RequestOptions({
            headers: this.headers,
            body: JSON.stringify(theme)
         }))
         .map((response: Response) => response.json())
         .catch(this.handleError)
         .subscribe(
            data => {
                console.log(data);
                data.success = JSON.parse(data.success);
                this.success = data.success;
                if(data.success) { 
                    this.dataStore.themes = this.dataStore.themes.filter(themes => themes !== theme);
                    this._themes.next(Object.assign({}, this.dataStore).themes);
                } 
            });
    }

    private handleError(error: any) {
        console.error('Error', error);
        return Observable.throw(error.message || error);
    }

}   