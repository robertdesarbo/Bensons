import { Field } from './field.model';

export class FieldLocation {
  protected constructor(
		public id: number,
		public name: string,
		public address: string,
		public city: string,
		public state: string,
		public zip: number,
		public active: boolean,
  public fields?: Field[]) {
	}

	public static from(fieldLocation: FieldLocation): FieldLocation {
		return new FieldLocation(fieldLocation.id, fieldLocation.name, fieldLocation.address, fieldLocation.city, fieldLocation.state,
			fieldLocation.zip, fieldLocation.active, fieldLocation.fields);
	}
}
