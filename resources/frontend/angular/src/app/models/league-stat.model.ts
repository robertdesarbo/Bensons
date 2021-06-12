export class LeagueStat {
	protected constructor(
		public divisions: number,
		public teams: number,
		public fields: number) {
	}

	public static from(leagueStat: LeagueStat): LeagueStat {
		return new LeagueStat(leagueStat.divisions, leagueStat.teams, leagueStat.fields);
	}
}
