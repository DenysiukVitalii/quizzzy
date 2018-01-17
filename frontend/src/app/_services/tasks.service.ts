import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {Observable} from "rxjs/Observable"
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TasksService {

    tasks: Observable<any[]>
    private _tasks: BehaviorSubject<any[]>;
    private dataStore: {
        tasks: any[]
    };
    
    success = undefined;

    constructor(private http: Http) {
        this.dataStore = { tasks: [] };
        this._tasks = <BehaviorSubject<any[]>>new BehaviorSubject([]);
        this.tasks = this._tasks.asObservable();
    }

    headers = new Headers({"Content-Type": "application/json"});
    options = new RequestOptions({ headers: this.headers });

    url = 'http://localhost:8081/';
    
    getAll() {
        this.http.get(this.url +'get_tasks')
        .map((response: Response) => response.json())
        .catch(this.handleError)
        .subscribe(data => {
            this.dataStore.tasks = data;
            this._tasks.next(Object.assign({}, this.dataStore).tasks);
          });
    }

    create(id_topic, question, answers) {
        this.success = undefined;
        // let name = task.name;
        let task = {
            id_topic: id_topic,
            question: question,
            answers: answers
        };

        this.http.post(this.url + 'create_question', JSON.stringify(task), this.options)
        .map((response: Response) => response.json())
        .catch(this.handleError)
        .subscribe(data => {
            console.log(data);
            data.success = JSON.parse(data.success);
            this.success = data.success;
            if(data.success) { 
                this.dataStore.tasks.push({id: data.id, question: question});
                console.log(this.dataStore.tasks);
                this._tasks.next(Object.assign({}, this.dataStore).tasks);
            }
          });
    }

    delete(task) {
        this.success = undefined;
        this.http.delete(this.url + 'delete_question', new RequestOptions({
            headers: this.headers,
            body: JSON.stringify(task)
         }))
         .map((response: Response) => response.json())
         .catch(this.handleError)
         .subscribe(
            data => {
                console.log(data);
                data.success = JSON.parse(data.success);
                this.success = data.success;
                if(data.success) { 
                    this.dataStore.tasks = this.dataStore.tasks.filter(tasks => tasks !== task);
                    this._tasks.next(Object.assign({}, this.dataStore).tasks);
                } 
            });
    }

    private handleError(error: any) {
        console.error('Error', error);
        return Observable.throw(error.message || error);
    }
}   