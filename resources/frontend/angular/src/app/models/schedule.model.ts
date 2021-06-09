import { Team } from 'src/app/models/team.model';
import { Umpire } from 'src/app/models/umpire.model';
import { Field } from 'src/app/models/field.model';

export class Schedule {
	protected constructor(
		public home_id: number,
		public away_id: number,
		public game_date: string,
		public field_id: number,
		public home_team?: Team,
		public away_team?: Team,
		public field?: Field,
		public umpires?: Umpire[],
		public home_score?: number,
		public away_score?: number,
		public delayed?: number,
		public canceled?: number,
		public completed?: number,
		public rescheduled?: number,
		public notes?: string) {
	}

	public static from(schedule: Schedule): Schedule {
		return new Schedule(schedule.home_id, schedule.away_id, schedule.game_date,
			schedule.field_id, schedule.home_team, schedule.away_team, schedule.field,
			schedule.umpires, schedule.home_score, schedule.away_score,
			schedule.delayed, schedule.canceled, schedule.completed, schedule.rescheduled,
			schedule.notes);
	}
}
