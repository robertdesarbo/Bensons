import { Sport } from 'src/app/models/enum/sport.enum';

export class League {
    protected constructor(
        public name: string,
        public sport: Sport) {
        }

        public static from(league: League): League {
            return new League(league.name, league.sport);
        }
}
