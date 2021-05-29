import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap, mergeMap } from 'rxjs/operators';

import { User } from 'src/app/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public isLoggedIn = false;

    constructor(private http: HttpClient) {
        //
    }

    login(email: string, password: string) {
        return this.http.get('/sanctum/csrf-cookie').pipe(mergeMap(() => {
            return this.http.post<any>('/api/login', { 'email': email, password: password }).pipe(map(({success}) => {
                this.isLoggedIn = success;

                return success;
            }));
        }));
    }

    logout() {
        return this.http.get<any>('/api/logout').pipe(tap(() => {

            this.isLoggedIn = false;

            return true;
        }));
    }
}
