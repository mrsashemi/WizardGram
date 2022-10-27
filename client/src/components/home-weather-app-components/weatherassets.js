function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
  
export const weatherImages = importAll(require.context('./weather-app-images', false, /\.(jpg)$/));