export class Field {
	protected constructor(
		public id: number,
    public field_location_id: number,
    public name: string,
    public number: number,
    public sport: 'basketball' | 'softball',
    public lights: boolean,
    public active: boolean,
    public ground_rules: string,
		public alcohol: boolean,
		public private_property: boolean,
		public pets: boolean,
		public smoking: boolean,) {
	}

	public static from(field: Field): Field {
		return new Field(field.id, field.field_location_id, field.name, field.number, field.sport, field.active, field.lights,
      field.ground_rules, field.alcohol, field.private_property, field.pets, field.smoking);
	}
}
