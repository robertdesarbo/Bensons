export class Umpire {
	protected constructor(
		public id: number,
		public name: string) {
	}

	public static from(umpire: Umpire): Umpire {
		return new Umpire(umpire.id, umpire.name);
	}
}
