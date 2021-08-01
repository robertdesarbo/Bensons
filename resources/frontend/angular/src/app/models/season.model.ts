export class Season {
	protected constructor(
		public id: number,
		public start_at: Date,
		public active: boolean,
		public number_of_games: number,
		public league_fee: number,
		public offical_fee_per_game: number) {
	}

	public static from(season: Season): Season {
		return new Season(season.id, season.start_at, season.active,
			season.number_of_games, season.league_fee, season.offical_fee_per_game);
	}
}
