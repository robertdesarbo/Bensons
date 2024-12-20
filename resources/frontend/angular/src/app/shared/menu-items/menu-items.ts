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
			state: 'manage-league',
			name: 'Manage League',
			type: 'link',
			icon: 'manage_search',
			display: this.authenticationService.isAuthenticated
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
			icon: 'group_add',
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
			state: 'field-locations',
			name: 'Field Locations',
			type: 'link',
			icon: 'map',
			display: true
		},
		{
			state: 'lynns',
			name: 'Lynn\'s Uptown Tavern',
			type: 'link',
			icon: 'sports_bar',
			display: true
		},
		{
			state: 'free-agents',
			name: 'Free Agents',
			type: 'link',
			icon: 'person_add_alt',
			display: true
		},
		{
			state: 'forms-and-rules',
			name: 'Forms & Rules',
			type: 'link',
			icon: 'gavel',
			display: true
		},
		{
			state: 'sponsors',
			name: 'Sponsors',
			type: 'link',
			icon: 'storefront',
			display: true
		},
		{
			state: 'terms',
			name: 'Terms',
			type: 'link',
			icon: 'article',
			display: true
		},
	];

	constructor(public authenticationService: AuthenticationService) {
		//
	}

	getMenuitem(): Menu[] {
		return this.menu_items;
	}
}
