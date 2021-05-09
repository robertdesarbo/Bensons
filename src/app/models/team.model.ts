export class Team {
    protected constructor(
        public name: string,
        public abbreviation: string,
        public league?: string,
        public division?: string) {
        }

        public static from(team: Team): Team {
            return new Team(team.name, team.abbreviation, team.league, team.division);
        }
    }
