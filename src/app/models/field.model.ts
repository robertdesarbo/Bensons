export class Field {
    protected constructor(
        public name: string,
        public address: string,
        public city: string,
        public state: string,
        public zip: number,
        public alcohol: boolean,
        public private_property: boolean,
        public notes?: string) {
        }

        public static from(field: Field): Field {
            return new Field(field.name, field.address, field.city, field.state,
                field.zip, field.alcohol, field.private_property, field.notes);
        }
}
