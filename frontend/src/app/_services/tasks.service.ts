import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Discipline } from './../_models/discipline';
import { Discip } from './../_models/discip';

import {Observable} from "rxjs/Observable"
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TasksService {
    constructor(private http: Http) { }
    headers = new Headers({"Content-Type": "application/json"});
    options = new RequestOptions({ headers: this.headers });

    url = 'http://localhost:8081/';
    
    getAll(): Observable<any[]> {
        return this.http.get(this.url +'get_disc').map((response: Response) => response.json()).catch(this.handleError);
    }


    create(discipline: Discipline) {
        return this.http.post(this.url + 'create_disc', JSON.stringify(discipline), this.options).map((response: Response) => response.json()).catch(this.handleError);
    }

    // update(user) {
    //     return this.http.put('edit_disc' , user).map((response: Response) => response.json());
    // }

    delete(row: Discip) {
        return this.http.delete(this.url + 'delete_disc', new RequestOptions({
            headers: this.headers,
            body: JSON.stringify(row)
         })).map((response: Response) => response.json()).catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('Error', error);
        return Observable.throw(error.message || error);
    }
}   