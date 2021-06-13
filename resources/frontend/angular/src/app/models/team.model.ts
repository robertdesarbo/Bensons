import { Division } from 'src/app/models/division.model';

export class Team {
	protected constructor(
		public name: string,
		public abbreviation: string,
		public division_id: number,
		public division?: Division) {
	}

	public static from(team: Team): Team {
		return new Team(team.name, team.abbreviation, team.division_id, team.division);
	}
}
