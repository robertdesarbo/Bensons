import { Team } from 'src/app/models/Team.model';
import { Umpire } from 'src/app/models/Umpire.model';
import { Field } from 'src/app/models/Field.model';

export class Schedule {
    protected constructor(
        public home: Team,
        public away: Team,
        public date: Date,
        public field: Field,
        public umpires: Umpire[]) {
        }

        public static from(schedule: Schedule): Schedule {
            return new Schedule(schedule.home, schedule.away, schedule.date,
                schedule.field, schedule.umpires);
        }
}
