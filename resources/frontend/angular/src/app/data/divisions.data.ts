
import { Division } from 'src/app/models/division.model';
import { League } from 'src/app/models/league.model';

import { leagues } from 'src/app/data/leagues.data';

const divisions: Division[] = [
	{
		id: 1,
		name: "c/d",
		league: leagues.find(element => element.name == 'Sunday League') as League
	},
	{
		id: 2,
		name: "e",
		league: leagues.find(element => element.name == 'Sunday League') as League
	}
];

export { divisions };
