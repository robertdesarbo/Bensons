import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
    msg = '';
    constructor(private routes: Router,private http: HttpClient) { }

        check(email: string, password: string) {
            this.http.get('/sanctum/csrf-cookie').subscribe(() => {
                this.http.post<any>('/api/login', { 'email': email, password: password }).subscribe(login => {
                    console.log(login);

                    if (login.success == true) {
                        this.routes.navigate(['/home']);
                    } else {
                        this.msg = 'Invalid Email or Password';
                    }

                }, error => console.log(error))
            });
        }

        ngOnInit() {}
    }
