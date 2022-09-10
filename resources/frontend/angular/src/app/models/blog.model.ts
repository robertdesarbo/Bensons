export class Blog {
  protected constructor(
		public published: string,
		public title: string,
		public subtitle: string,
		public description: string,
		public position: number,
    // tslint:disable-next-line:variable-name
		public publish_start_date: string) {
	}

  public static from(blog: Blog): Blog {
		return new Blog(blog.published, blog.title, blog.subtitle, blog.description, blog.position, blog.publish_start_date);
	}
}
