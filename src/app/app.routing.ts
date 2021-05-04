import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { AdminComponent } from './login/admin.component';
import { HomeComponent } from './pages/home/home.component';

export const AppRoutes: Routes = [
    {
        path: '',
        component: FullComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent,
                data: {
                    title: 'Benson\'s Empire State Sports Sunday Softball League',
                }
            },
            {
                path: 'schedule',
                component: HomeComponent,
                data: {
                    title: 'Schedule',
                }
            },
            {
                path: 'standings',
                component: HomeComponent,
                data: {
                    title: 'Standings',
                }
            },
            {
                path: 'field_locations',
                component: HomeComponent,
                data: {
                    title: 'Field Locations',
                }
            },
            {
                path: 'rules',
                component: HomeComponent,
                data: {
                    title: 'Rules',
                }
            },
            {
                path: 'schedule_preference',
                component: HomeComponent,
                data: {
                    title: 'Schedule Preference',
                }
            },
            {
                path: 'bulletin_board',
                component: HomeComponent,
                data: {
                    title: 'Bulletin Board',
                }
            },
            {
                path: 'mvp_voting',
                component: HomeComponent,
                data: {
                    title: 'MVP voting',
                }
            },
        ]
    },
    {
        path: 'admin',
        component: AdminComponent,
    }
];
