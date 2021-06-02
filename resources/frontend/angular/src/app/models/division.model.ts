import { League } from 'src/app/models/league.model';

export class Division {
	protected constructor(
		public id: number,
		public name: string,
		public league: League) {
	}

	public static from(division: Division): Division {
		return new Division(division.id, division.name, division.league);
	}
}
