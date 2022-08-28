function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
  
export const productImages = importAll(require.context('./productimages', false, /\.(jpg||PNG)$/));