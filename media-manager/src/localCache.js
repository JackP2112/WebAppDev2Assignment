class localCache {

  constructor() {
    this.media = [];
  }

  getAll() {
    return this.media;
  }

  populate(media) {
    this.media = media;
  }
}

export default (new localCache() );
