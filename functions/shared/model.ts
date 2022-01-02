export interface CustomEnv {
  VIEWS: KVNamespace;
}

export interface PageView {
  slug: string;
  pv: number;
}

export class PageViewModel {
  // eslint-disable-next-line no-useless-constructor
  constructor(private db: KVNamespace) {}

  async find(slug: string) {
    const result = await this.db.get(slug, 'text');
    const pv = Number(result || 0) + 1;
    await this.db.put(slug, pv.toString(), 'text');
    return { slug, pv } as PageView;
  }

  async list(slugs: string[]) {
    const result = await Promise.allSettled(
      slugs.map((slug) =>
        this.db
          .get(slug, 'text')
          .then((views) => ({ slug, pv: Number(views || 0) } as PageView))
      )
    );
    return result
      .filter((x) => x.status === 'fulfilled')
      .map((x: { value: PageView }) => x.value);
  }
}
