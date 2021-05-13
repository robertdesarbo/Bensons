
import { Division } from 'src/app/models/division.model';
import { League } from 'src/app/models/league.model';

import { leagues } from 'src/app/data/leagues.data';

const divisions: Division[] = [
    {
        name: "c/d",
        league: leagues.find(element => element.name == 'Sunday League') as League
    },
    {
        name: "e",
        league: leagues.find(element => element.name == 'Sunday League') as League
    }
];

export { divisions };
