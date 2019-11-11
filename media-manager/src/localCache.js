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
  
  addItem(itemAttrs) {
    const item = {
      type: itemAttrs[0],
      title: itemAttrs[1],
      releaseDate: itemAttrs[2],
      creators: itemAttrs[3],
      genres: itemAttrs[4],
      image: itemAttrs[6],
      comments: itemAttrs[7],
      status: itemAttrs[8]
    }
    this.media.push(item);
  }

  deleteItem(item) {
    const index = this.media.indexOf(item);
    if (index >= 0){
      this.media.splice(index,1);
    }
  }
}

export default (new localCache() );
