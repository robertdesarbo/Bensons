import { Division } from './division.model';

export class RegisteredTeam {
  protected constructor(
		public team_name: string,
		public captain_name: string,
		public phone: string,
		public email: string,
		public division: Division) {
	}

	public static from(registeredTeam: RegisteredTeam): RegisteredTeam {
		return new RegisteredTeam(registeredTeam.team_name, registeredTeam.captain_name, registeredTeam.phone,
      registeredTeam.email, registeredTeam.division);
	}
}
