import { Team } from 'src/app/models/team.model';
import { Umpire } from 'src/app/models/umpire.model';
import { Field } from 'src/app/models/field.model';

export class Schedule {
    protected constructor(
        public home_team: Team,
        public away_team: Team,
        public game_date: string,
        public field: Field,
        public umpires: Umpire[],
        public home_score?: number,
        public away_score?: number,
        public delayed?: boolean,
        public rescheduled?: boolean) {
        }

        public static from(schedule: Schedule): Schedule {
            return new Schedule(schedule.home_team, schedule.away_team, schedule.game_date,
                schedule.field, schedule.umpires, schedule.home_score, schedule.away_score,
                schedule.delayed, schedule.rescheduled);
            }
        }
