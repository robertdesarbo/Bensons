export class TeamFreeAgent {
	protected constructor(
		public id: number,
		public name: string,
		public phone: string,
		public email: string,
		public positions: string[],
		public genders: string[]) {
	}

	public static from(teamFreeAgent: TeamFreeAgent): TeamFreeAgent {
		return new TeamFreeAgent(teamFreeAgent.id, teamFreeAgent.name, teamFreeAgent.phone,
			teamFreeAgent.email, teamFreeAgent.positions, teamFreeAgent.genders);
	}
}
