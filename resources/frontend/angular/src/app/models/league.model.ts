import { Sport } from 'src/app/models/enum/sport.enum';

export class League {
	protected constructor(
		public id: number,
		public name: string,
		public sport: Sport) {
	}

	public static from(league: League): League {
		return new League(league.id, league.name, league.sport);
	}
}
