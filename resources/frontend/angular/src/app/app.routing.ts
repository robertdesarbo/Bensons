import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { AdminComponent } from './login/admin.component';

import { HomeComponent } from './pages/home/home.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { SchedulesComponent } from './pages/schedules/schedules.component';
import { StandingsComponent } from './pages/standings/standings.component';
import { FieldsComponent } from './pages/fields/fields.component';
import { RulesComponent } from './pages/rules/rules.component';
import { SchedulePreferenceComponent } from './pages/schedule-preference/schedule-preference.component';
import { BulletinBoardComponent } from './pages/bulletin-board/bulletin-board.component';
import { MvpVotingComponent } from './pages/mvp-voting/mvp-voting.component';

import { LoginActiveGuard } from './shared/security/login-active.guard';
import { AuthenticationResolver } from 'src/app/shared/authenticate-resolver.service';

export const AppRoutes: Routes = [
	{
		path: '',
		component: FullComponent,
		resolve: { authenticate: AuthenticationResolver },
		children: [
			{
				path: '',
				redirectTo: '/home',
				pathMatch: 'full'
			},
			{
				path: 'home',
				component: HomeComponent,
				data: {
					title: 'Home',
				}
			},
			{
				path: 'team',
				component: TeamsComponent,
				data: {
					title: 'Teams',
				}
			},
			{
				path: 'schedule',
				component: SchedulesComponent,
				data: {
					title: 'Schedule',
				}
			},
			{
				path: 'standings',
				component: StandingsComponent,
				data: {
					title: 'Standings',
				}
			},
			{
				path: 'field_locations',
				component: FieldsComponent,
				data: {
					title: 'Field Locations',
				}
			},
			{
				path: 'rules',
				component: RulesComponent,
				data: {
					title: 'Rules',
				}
			},
			{
				path: 'schedule_preference',
				component: SchedulePreferenceComponent,
				data: {
					title: 'Schedule Preference',
				}
			},
			{
				path: 'bulletin_board',
				component: BulletinBoardComponent,
				data: {
					title: 'Bulletin Board',
				}
			},
			{
				path: 'mvp_voting',
				component: MvpVotingComponent,
				data: {
					title: 'MVP voting',
				}
			},
		]
	},
	{
		path: 'admin',
		component: AdminComponent,
		canActivate: [LoginActiveGuard],
	}
];
