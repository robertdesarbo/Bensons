export class Season {
	protected constructor(
		public id: number,
		public active: boolean,
		public complete: boolean,
		public start_at: Date,
		public number_of_games: number,
		public league_fee: number,
		public offical_fee_per_game: number) {
	}

	public static from(season: Season): Season {
		return new Season(season.id, season.active, season.complete, season.start_at,
			season.number_of_games, season.league_fee, season.offical_fee_per_game);
	}
}
