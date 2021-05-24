export class Umpire {
    protected constructor(
        public name: string) {
        }

        public static from(umpire: Umpire): Umpire {
            return new Umpire(umpire.name);
        }
}
