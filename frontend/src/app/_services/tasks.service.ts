import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Discipline } from './../_models/discipline';

import {Observable} from "rxjs/Observable"
interface UserType {
    id: number;
    name: string;
}

@Injectable()
export class TasksService {
    constructor(private http: Http) { }
    headers = new Headers({"Content-Type": "application/json"});
    options = new RequestOptions({ headers: this.headers });

    url = 'http://localhost:8081/';

    getAll(): Observable<UserType[]> {
        return this.http.get(this.url +'get_disc').map((response: Response) => response.json());
    }


    create(discipline: Discipline) {
        return this.http.post(this.url + 'create_disc', JSON.stringify(discipline), this.options).map((response: Response) => response.json());
    }

    // update(user: User) {
    //     return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    // }

    // delete(id: number) {
    //     return this.http.delete('/api/users/' + id).map((response: Response) => response.json());
    // }

}