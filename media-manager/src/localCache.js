class localCache {

  constructor() {
    this.media = [];
    this.images = []; //to be replaced with persistent backend
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

  storeImage(file) {
    this.images.push(file);
  }

  getImage(name) {
    return this.images.filter(file => {
      return file.name === name
    });
  }
 
}

export default (new localCache() );
