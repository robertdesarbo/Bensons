import { Team } from 'src/app/models/Team.model';

export class Standings {
    protected constructor(
        public rank: number,
        public team: Team,
        public won: number,
        public lost: number,
        public win_percentage: number,
        public games_behind: number,
        public games_played: number) {
        }

        public static from(standings: Standings): Standings {
            return new Standings(standings.rank, standings.team, standings.won, standings.lost,
                standings.win_percentage, standings.games_behind, standings.games_played);
        }
    }
