const images = import.meta.glob('@images/banner/*.*');

const imgs = {};
Object.keys(images).map((image) => images[image]().then((module) => {
  imgs[module.default] = module.default;
}));

export default imgs;
