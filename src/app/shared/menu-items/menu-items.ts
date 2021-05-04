import { Injectable } from '@angular/core';

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

const MENUITEMS = [
    {
        state: 'home',
        name: 'Home',
        type: 'link',
        icon: 'content_copy'
    },
    {
        state: 'schedule',
        name: 'Schedule',
        type: 'link',
        icon: 'calendar_today'
    },
    {
        state: 'standings',
        name: 'Standings',
        type: 'link',
        icon: 'assignment'
    },
    {
        state: 'field_locations',
        name: 'Field Locations',
        type: 'link',
        icon: 'map'
    },
    {
        state: 'rules',
        name: 'Rules',
        type: 'link',
        icon: 'gavel'
    },
    {
        state: 'schedule_preference',
        name: 'Schedule Preference',
        type: 'link',
        icon: 'quiz'
    },
    {
        state: 'bulletin_board',
        name: 'Bulletin Board',
        type: 'link',
        icon: 'description'
    },
    {
        state: 'mvp_voting',
        name: 'MVP voting',
        type: 'link',
        icon: 'ballot'
    }
];

@Injectable()
export class MenuItems {
    getMenuitem(): Menu[] {
        return MENUITEMS;
    }
}
