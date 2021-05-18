import { Team } from 'src/app/models/team.model';
import { Umpire } from 'src/app/models/umpire.model';
import { Field } from 'src/app/models/field.model';

export class Schedule {
    protected constructor(
        public home: Team,
        public away: Team,
        public date: Date,
        public field: Field,
        public umpires: Umpire[],
        public home_score?: number,
        public away_score?: number,
        public delayed?: boolean,
        public rescheduled?: boolean) {
        }

        public static from(schedule: Schedule): Schedule {
            return new Schedule(schedule.home, schedule.away, schedule.date,
                schedule.field, schedule.umpires, schedule.home_score, schedule.away_score,
                schedule.delayed, schedule.rescheduled);
            }
        }
