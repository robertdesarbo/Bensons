import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap, mergeMap } from 'rxjs/operators';

import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { User } from 'src/app/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(private http: HttpClient, private snackBar: MatSnackBar) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get isAuthenticated(): boolean {
        return this.userSubject.value !== null;
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(email: string, password: string) {
        return this.http.get('/sanctum/csrf-cookie').pipe(mergeMap(() => {
            return this.http.post<any>('/api/login', { 'email': email, password: password }).pipe(map(({success,user}) => {
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);

                return success;
            }));
        }));
    }

    logout() {
        return this.http.get<any>('/api/logout').subscribe(() => {
            localStorage.removeItem('user');
            this.userSubject.next(null);

            this.snackBar.open('You have been logged out', 'Dismiss', {
                horizontalPosition: "right",
                verticalPosition: "top",
            });
        });
    }
}
