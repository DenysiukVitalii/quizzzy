import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {Observable} from "rxjs/Observable"
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TestsService {

    tests: Observable<any[]>
    private _tests: BehaviorSubject<any[]>;
    private dataStore: {
        tests: any[]
    };
    
    success = undefined;

    constructor(private http: Http) {
        this.dataStore = { tests: [] };
        this._tests = <BehaviorSubject<any[]>>new BehaviorSubject([]);
        this.tests = this._tests.asObservable();
    }

    headers = new Headers({"Content-Type": "application/json"});
    options = new RequestOptions({ headers: this.headers });

    url = 'http://localhost:8081/';
    
    getAll() {
        this.http.get(this.url +'get_tests')
        .map((response: Response) => response.json())
        .catch(this.handleError)
        .subscribe(data => {
            this.dataStore.tests = data;
            this._tests.next(Object.assign({}, this.dataStore).tests);
          });
    }

    create(theme, question, answers) {
        this.success = undefined;
        // let name = task.name;
        let task = {
            id_topic: theme.id,
            question: question,
            answers: answers
        };

        this.http.post(this.url + 'add_test', JSON.stringify(task), this.options)
        .map((response: Response) => response.json())
        .catch(this.handleError)
        .subscribe(data => {
            console.log(data);
            data.success = JSON.parse(data.success);
            this.success = data.success;
            if(data.success) { 
                this.dataStore.tests.push({id: data.id, question: question, topic: theme.topic, discipline: theme.discipline});
                console.log(this.dataStore.tests);
                this._tests.next(Object.assign({}, this.dataStore).tests);
            }
          });
    }

    delete(test) {
        this.success = undefined;
        this.http.delete(this.url + 'delete_test', new RequestOptions({
            headers: this.headers,
            body: JSON.stringify(test)
         }))
         .map((response: Response) => response.json())
         .catch(this.handleError)
         .subscribe(
            data => {
                console.log(data);
                data.success = JSON.parse(data.success);
                this.success = data.success;
                if(data.success) { 
                    this.dataStore.tests = this.dataStore.tests.filter(tests => tests !== test);
                    this._tests.next(Object.assign({}, this.dataStore).tests);
                } 
            });
    }

    private handleError(error: any) {
        console.error('Error', error);
        return Observable.throw(error.message || error);
    }
}   