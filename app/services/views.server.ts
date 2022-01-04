export interface PageView {
  slug: string;
  pv: number;
}

const mockDb: KVNamespace = {
  // eslint-disable-next-line
  async get(...args: any[]) {
    return Promise.resolve('9999999');
  },
  // eslint-disable-next-line
  async put(...args: any[]) {
    return Promise.resolve();
  }
};

export class ViewsModel {
  db: KVNamespace;

  constructor(db?: KVNamespace) {
    this.db = db || mockDb;
  }

  async visit(slug: string) {
    const [views, total] = await Promise.all(
      [slug, 'total'].map((key) => this.db.get(key, 'text'))
    );

    const pv = Number(views || 0) + 1;
    const pvTotal = Number(total || 0) + 1;

    await Promise.all([
      this.db.put(slug, pv.toString()),
      this.db.put('total', pvTotal.toString())
    ]);
    return [
      { slug, pv },
      { slug: 'total', pv: pvTotal }
    ] as PageView[];
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
