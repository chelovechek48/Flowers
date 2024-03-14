<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  imagesCatalogPath: {
    type: String,
    required: true,
  },
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

let imagesCollectionHasParsed = false;

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
    const isLink = !(typeof image === 'object' && image !== null);
    if (!isLink) {
      const patht = image.value.replace('@images', props.imagesCatalogPath);

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
        imagesCollectionObject[option.type][option.size].value = imageUrl;
      } else {
        imagesCollectionObject.default.value = imageUrl;
      }
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

  imagesCollectionHasParsed = true;
}());

const urlValidate = (path) => {
  const isObject = (typeof path === 'object' && path !== null);
  if (isObject) {
    return path.value;
  }
  return path;
};

const getSet = (set) => {
  const string = [];
  Object.entries(set).forEach((image) => {
    string.push(`${urlValidate(image[1])} ${image[0]}`);
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
      v-if="imagesCollectionHasParsed"
      class="image"
      :src="urlValidate(imagesCollectionObject['default']['1x'])"
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
