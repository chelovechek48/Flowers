<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  slideImagesPath: {
    type: Object,
    required: true,
  },
  slideSrc: {
    type: Object,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
});

const imagesCollectionObject = props.slideSrc;
const imagesCollectionArray = Object.entries(imagesCollectionObject);
const sourcesCollectionArray = imagesCollectionArray.filter((source) => source[0] !== 'default');

(async function getImagesCollectionObject() {
  const imagesPath = await Promise.all(
    Object.values(props.slideImagesPath).map(async (image) => {
      const module = await image();
      return module.default;
    }),
  );

  const setImagesUrl = (image, option) => {
    const patht = image.replace('@images', '/Flowers/src/assets/images');

    const filenameRegex = /^(.+?)(\.[^.]+)?$/;
    const filenameSplit = patht.match(filenameRegex);
    const filename = {
      title: filenameSplit[1].split('/').pop(),
      extension: filenameSplit[2],
    };

    const imageUrl = imagesPath.find((path) => {
      const isEqual = (path.includes(filename.title) && path.includes(filename.extension));
      return isEqual;
    });

    const isObject = (typeof option === 'object' && option !== null);
    if (isObject) {
      imagesCollectionObject[option.type][option.size] = imageUrl;
    } else {
      imagesCollectionObject.default = imageUrl;
    }
  };

  imagesCollectionArray.forEach((imageArray) => {
    const imagesArray = Object.entries(imageArray[1]);
    imagesArray.forEach((imageData) => {
      const imageType = imageArray[0];
      const imageSize = imageData[0];
      const option = {
        type: imageType,
        size: imageSize,
      };
      const imagePath = imageData[1];
      setImagesUrl(imagePath, option);
    });
  });
}());

const getSet = (set) => {
  const string = [];
  Object.entries(set).forEach((image) => {
    string.push(`${image[1]} ${image[0]}`);
  });
  return string;
};

</script>

<template>
  <picture>
    <source
      v-for="(slide, index) in sourcesCollectionArray"
      :key="index"
      :type="slide[0]"
      :srcset="getSet(imagesCollectionObject[slide[0]])"
    >
    <img
      class="image"
      :src="imagesCollectionObject['default']['1x']"
      :alt="alt"
      loading="lazy"
    >
  </picture>
</template>

<style lang="scss" scoped>
.image {
  width: inherit;
  height: inherit;
  object-fit: inherit;
  border-radius: inherit;
}
</style>