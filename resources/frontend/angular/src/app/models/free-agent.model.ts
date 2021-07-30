export class FreeAgent {
	protected constructor(
		public id: number,
		public name: string,
		public phone: string,
		public email: string,
		public gender: string,
		public division_id: number) {
	}

	public static from(freeAgent: FreeAgent): FreeAgent {
		return new FreeAgent(freeAgent.id, freeAgent.name, freeAgent.phone,
			freeAgent.email, freeAgent.gender, freeAgent.division_id);
	}
}
