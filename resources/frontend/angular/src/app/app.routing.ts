import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { AdminComponent } from './login/admin.component';

import { HomeComponent } from './pages/home/home.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { RegisteredTeamsComponent } from './pages/registered-teams/registered-teams.component';
import { FreeAgentsComponent } from './pages/free-agents/free-agents.component';

import { SchedulesComponent } from './pages/schedules/schedules.component';
import { StandingsComponent } from './pages/standings/standings.component';
import { FieldsComponent } from './pages/fields/fields.component';
import { RulesComponent } from './pages/rules/rules.component';
import { SponsersComponent } from './pages/sponsers/sponsers.component';

import { SchedulePreferenceComponent } from './pages/schedule-preference/schedule-preference.component';
import { BulletinBoardComponent } from './pages/bulletin-board/bulletin-board.component';
import { MvpVotingComponent } from './pages/mvp-voting/mvp-voting.component';

import { LoginActiveGuard } from './shared/security/login-active.guard';
import { AuthGuard } from './shared/security/auth.guard';
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
				},
				canActivate: [AuthGuard]
			},
			{
				path: 'registered-teams',
				component: RegisteredTeamsComponent,
				data: {
					title: 'Registered Teams',
				},
				canActivate: [AuthGuard]
			},
			{
				path: 'free-agents',
				component: FreeAgentsComponent,
				data: {
					title: 'Free Agents',
				},
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
				path: 'field-locations',
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
				path: 'sponsers',
				component: SponsersComponent,
				data: {
					title: 'Sponsers',
				},
			},
			{
				path: 'schedule-preference',
				component: SchedulePreferenceComponent,
				data: {
					title: 'Schedule Preference',
				}
			},
			{
				path: 'bulletin-board',
				component: BulletinBoardComponent,
				data: {
					title: 'Bulletin Board',
				}
			},
			{
				path: 'mvp-voting',
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
