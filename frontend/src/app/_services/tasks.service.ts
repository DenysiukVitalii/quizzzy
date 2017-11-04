import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Discipline } from './../_models/discipline';
import { Discip } from './../_models/discip';

import {Observable} from 'rxjs/Observable';

@Injectable()
export class TasksService {
    constructor(private http: Http) { }
    headers = new Headers({"Content-Type": "application/json"});
    options = new RequestOptions({ headers: this.headers });

    url = 'http://localhost:8081/';

    disciplines = [];

    // addDiscipline(discipline) {
    //     this.create(discipline)
    //     .subscribe(
    //         data => {
    //           console.log(data);
    //         //   this.getDisciplines();
    //         },
    //         error => {
    //           console.log(error);
    //         });
    // }

    getDisciplines() {
        console.log("qweew");
        this.getAll()
            .subscribe(
                data => {
                    console.log(data);
                    console.log(this.disciplines);
                    this.disciplines = data;
                    console.log(this.disciplines);
                },
                error => {
                    console.log(error);
                });
        return this.disciplines;
      }

    getAll() {
        return this.http.get(this.url + 'get_disc').map((response: Response) => response.json());
    }


    create(discipline: Discipline) {
        return this.http.post(
            this.url + 'create_disc',
            JSON.stringify(discipline),
            this.options).map((response: Response) => response.json()).subscribe();
    }

    // update(user) {
    //     return this.http.put('edit_disc' , user).map((response: Response) => response.json());
    // }

    delete(row: Discip) {
        // console.log(row);
        // console.log(row.id);
        // return this.http.delete(this.url + 'delete_disc', JSON.stringify(row)).map((response: Response) => response.json()).subscribe();
        return this.http.delete(this.url + 'delete_disc', new RequestOptions({
            headers: this.headers,
            body: JSON.stringify(row)
         })).subscribe();
    }

}