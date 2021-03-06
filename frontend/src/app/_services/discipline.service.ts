import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {Observable} from "rxjs/Observable"
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DisciplineService {

    disciplines: Observable<any[]>
    private _disciplines: BehaviorSubject<any[]>;
    private dataStore: {
        disciplines: any[]
    };
    
    success = undefined;

    constructor(private http: Http) {
        this.dataStore = { disciplines: [] };
        this._disciplines = <BehaviorSubject<any[]>>new BehaviorSubject([]);
        this.disciplines = this._disciplines.asObservable();
    }

    headers = new Headers({"Content-Type": "application/json"});
    options = new RequestOptions({ headers: this.headers });

    url = 'http://localhost:8081/';
    
    getAll() {
        this.http.get(this.url +'get_disc')
        .map((response: Response) => response.json())
        .catch(this.handleError)
        .subscribe(data => {
            this.dataStore.disciplines = data;
            this._disciplines.next(Object.assign({}, this.dataStore).disciplines);
          });
    }
    
    getSub(id) {
        console.log(id);
        let name;
        this.dataStore.disciplines.forEach(t => {
            if (t.id == id) { 
                name = t.name; 
            }
        });
        return name;
    }

    getDiscipline(name) {
        console.log(name);
        let id;
        console.log(this.dataStore.disciplines);

        this.dataStore.disciplines.forEach(t => {
            if (t.name == name) { 
                id = t.id; 
            }
        });
        console.log(id);
        return id;
    }

    create(discipline) {
        this.success = undefined;
        let name = discipline.name;
        this.http.post(this.url + 'create_disc', JSON.stringify(discipline), this.options)
        .map((response: Response) => response.json())
        .catch(this.handleError)
        .subscribe(data => {
            console.log(data);
            data.success = JSON.parse(data.success);
            this.success = data.success;
            if(data.success) { 
                this.dataStore.disciplines.push({id: data.id, name: name});
                console.log(this.dataStore.disciplines);
                this._disciplines.next(Object.assign({}, this.dataStore).disciplines);
            }
          });
    }

    update(discipline) {
        this.success = undefined;
        let updateDiscipline = discipline;
        console.log(updateDiscipline);
        this.http.put(this.url + 'edit_disc', JSON.stringify(discipline), this.options)
        .map(response => response.json())
        .catch(this.handleError)
        .subscribe(data => {
            console.log(data);
            data.success = JSON.parse(data.success);
            this.success = data.success;
            if(data.success) { 
                this.dataStore.disciplines.forEach((t, i) => {
                    if (t.id === updateDiscipline.id) { this.dataStore.disciplines[i] = updateDiscipline; }
                });
                this._disciplines.next(Object.assign({}, this.dataStore).disciplines);
            }
        });
    }

    delete(discipline) {
        this.success = undefined;
        this.http.delete(this.url + 'delete_disc', new RequestOptions({
            headers: this.headers,
            body: JSON.stringify(discipline)
         }))
         .map((response: Response) => response.json())
         .catch(this.handleError)
         .subscribe(
            data => {
                console.log(data);
                data.success = JSON.parse(data.success);
                this.success = data.success;
                if(data.success) { 
                    this.dataStore.disciplines = this.dataStore.disciplines.filter(disciplines => disciplines !== discipline);
                    this._disciplines.next(Object.assign({}, this.dataStore).disciplines);
                } 
            });
    }

    private handleError(error: any) {
        console.error('Error', error);
        return Observable.throw(error.message || error);
    }
}   