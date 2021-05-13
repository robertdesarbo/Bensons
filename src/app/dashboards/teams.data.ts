
import { Team } from 'src/app/models/team.model';
import { Division } from 'src/app/models/division.model';

import { divisions } from 'src/app/data/divisions.data';

const teams: Team[] = [
    {
        name: 'Grapeville Insurance',
        abbreviation: 'GIA',
        division: divisions.find(element => element.name == 'c/d') as Division
    },
    {
        name: 'Cake Eaters',
        abbreviation: 'CAK',
        division: divisions.find(element => element.name == 'c/d') as Division
    },
    {
        name: 'Habitat 4 Instanity',
        abbreviation: 'H4I',
        division: divisions.find(element => element.name == 'c/d') as Division
    },
    {
        name: 'Heavy Hitters',
        abbreviation: 'HHS',
        division: divisions.find(element => element.name == 'c/d') as Division
    },
    {
        name: 'The Big Sticks',
        abbreviation: 'TBS',
        division: divisions.find(element => element.name == 'c/d') as Division
    },
    {
        name: 'Takeover Sun',
        abbreviation: 'TKS',
        division: divisions.find(element => element.name == 'c/d') as Division
    },
    {
        name: 'The Pubbers',
        abbreviation: 'PUB',
        division: divisions.find(element => element.name == 'c/d') as Division
    },
    {
        name: 'Brew Jays',
        abbreviation: 'BRJ',
        division: divisions.find(element => element.name == 'c/d') as Division
    },

    {
        name: 'Fake Blunters',
        abbreviation: 'FAK',
        division: divisions.find(element => element.name == 'e') as Division
    },
    {
        name: 'I\'d Hit It',
        abbreviation: 'HIT',
        division: divisions.find(element => element.name == 'e') as Division
    },
    {
        name: '518 Ballers',
        abbreviation: '518',
        division: divisions.find(element => element.name == 'e') as Division
    },
    {
        name: 'Misfits',
        abbreviation: 'MIS',
        division: divisions.find(element => element.name == 'e') as Division
    },
    {
        name: 'Turntable Brewing',
        abbreviation: 'TTB',
        division: divisions.find(element => element.name == 'e') as Division
    },
    {
        name: 'Five Star Sunday',
        abbreviation: 'FVS',
        division: divisions.find(element => element.name == 'e') as Division
    },
    {
        name: 'Backdoor Sliders SUN',
        abbreviation: 'BCS',
        division: divisions.find(element => element.name == 'e') as Division
    },
];

export { teams };
