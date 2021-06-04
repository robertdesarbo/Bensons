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
	public user: BehaviorSubject<User>;

	constructor(private http: HttpClient, private snackBar: MatSnackBar) {
		this.user = new BehaviorSubject<User>(null);
	}

	public get isAuthenticated(): boolean {
		return this.user.value !== null;
	}

	public get userValue(): User {
		return this.user.value;
	}

	checkAuthentication() {
		return this.http.get('/sanctum/csrf-cookie').pipe(mergeMap(() => {
			return this.http.get<any>('/api/session').pipe(map(({ success, user }) => {
				this.user.next(user);

				return success;
			}));
		}));
	}

	login(email: string, password: string) {
		return this.http.get('/sanctum/csrf-cookie').pipe(mergeMap(() => {
			return this.http.post<any>('/api/login', { 'email': email, password: password }).pipe(map(({ success, user }) => {
				this.user.next(user);

				return success;
			}));
		}));
	}

	logout() {
		return this.http.get<any>('/api/logout').subscribe(() => {
			localStorage.removeItem('user');
			this.user.next(null);

			this.snackBar.open('You have been logged out', 'Dismiss', {
				duration: 3000,
				horizontalPosition: "right",
				verticalPosition: "top",
			});
		});
	}
}
