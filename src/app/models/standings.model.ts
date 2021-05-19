import { Team } from 'src/app/models/team.model';

export class Standings {

    constructor(
        public team: Team,
        public won: number,
        public lost: number,
        readonly rank?: number,
        readonly games_behind?: number,
        readonly games_played?: number,
        readonly win_percentage?: string) {
            this.games_played = this.won + this.lost;
            this.win_percentage = (this.won / this.games_played).toFixed(3);
        }

        static from(standings: Standings): Standings {
            return new Standings(standings.team, standings.won, standings.lost, standings.rank, standings.games_behind);
        }
    }
