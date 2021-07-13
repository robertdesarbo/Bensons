import { Injectable } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

export interface BadgeItem {
	type: string;
	value: string;
}
export interface Saperator {
	name: string;
	type?: string;
}
export interface SubChildren {
	state: string;
	name: string;
	type?: string;
}
export interface ChildrenItems {
	state: string;
	name: string;
	type?: string;
	child?: SubChildren[];
}

export interface Menu {
	state: string;
	name: string;
	type: string;
	icon: string;
	badge?: BadgeItem[];
	saperator?: Saperator[];
	children?: ChildrenItems[];
}



@Injectable()
export class MenuItems {

	private menu_items = [
		{
			state: 'home',
			name: 'Home',
			type: 'link',
			icon: 'content_copy',
			display: true
		},
		{
			state: 'team',
			name: 'Teams',
			type: 'link',
			icon: 'people',
			display: this.authenticationService.isAuthenticated
		},
		{
			state: 'registered-teams',
			name: 'Registered Teams',
			type: 'link',
			icon: 'people',
			display: this.authenticationService.isAuthenticated
		},
		{
			state: 'schedule',
			name: 'Schedule',
			type: 'link',
			icon: 'calendar_today',
			display: true
		},
		{
			state: 'standings',
			name: 'Standings',
			type: 'link',
			icon: 'assignment',
			display: true
		},
		{
			state: 'field_locations',
			name: 'Field Locations',
			type: 'link',
			icon: 'map',
			display: true
		},
		{
			state: 'free-agents',
			name: 'Free Agents',
			type: 'link',
			icon: 'person_add',
			display: true
		},
		{
			state: 'rules',
			name: 'Rules',
			type: 'link',
			icon: 'gavel',
			display: true
		},
		{
			state: 'schedule_preference',
			name: 'Schedule Preference',
			type: 'link',
			icon: 'quiz',
			display: true
		},
		{
			state: 'bulletin_board',
			name: 'Bulletin Board',
			type: 'link',
			icon: 'description',
			display: true
		},
		{
			state: 'mvp_voting',
			name: 'MVP voting',
			type: 'link',
			icon: 'ballot',
			display: true
		}
	];

	constructor(public authenticationService: AuthenticationService) {
		//
	}

	getMenuitem(): Menu[] {
		return this.menu_items;
	}
}
