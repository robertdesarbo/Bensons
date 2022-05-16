export class Field {
	protected constructor(
		public id: number,
    public field_location_id: number,
    public number: number,
    public name: string,
		public alcohol: boolean,
		public private_property: boolean,
		public pets: boolean,
		public smoking: boolean,
    public ground_rules: string,
    public sport: 'basketball' | 'softball',
    public lights: boolean,
    public active: boolean) {
	}

	public static from(field: Field): Field {
		return new Field(field.id, field.field_location_id, field.number, field.name, field.alcohol,
			field.private_property, field.pets, field.smoking, field.ground_rules, field.sport, field.lights, field.active);
	}
}
