import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AuthenticationService } from 'src/app/authentication/authentication.service';

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
    constructor(private routes: Router,private http: HttpClient,private authenticationService: AuthenticationService) { }
    check(email: string, password: string) {
        this.authenticationService.login(email, password).subscribe(success => {
            if (success) {
                this.routes.navigate(['/home']);
            } else {
                this.msg = 'Invalid Email or Password';
            }
        }, error => console.log(error))
    }

    ngOnInit() {}
}
