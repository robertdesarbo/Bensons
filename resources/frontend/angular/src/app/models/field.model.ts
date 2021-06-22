export class Field {
	protected constructor(
		public id: number,
		public name: string,
		public address: string,
		public city: string,
		public state: string,
		public zip: number,
		public total_fields: number,
		public field_alpha_display: boolean,
		public alcohol: boolean,
		public private_property: boolean,
		public pets: boolean,
		public smoking: boolean,
		public notes?: string) {
	}

	public static from(field: Field): Field {
		return new Field(field.id, field.name, field.address, field.city, field.state,
			field.zip, field.total_fields, field.field_alpha_display, field.alcohol,
			field.private_property, field.pets, field.smoking, field.notes);
	}
}
