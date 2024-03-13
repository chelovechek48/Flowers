<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  images: {
    type: Object,
    required: true,
  },
  slideSrc: {
    type: Object,
    required: true,
  },
  slideAlt: {
    type: String,
    required: true,
  },
});

const src = props.slideSrc;
const options = Object.entries(src);
const sources = options.filter((source) => source[0] !== 'default');

(async function getImagesCollection() {
  const imagePaths = await Promise.all(
    Object.values(props.images).map(async (image) => {
      const module = await image();
      return module.default;
    }),
  );

  const replace = (img, type) => {
    const isLink = !(typeof img === 'object' && img !== null);
    if (!isLink) {
      const patht = img.value.replace('@images', '/Flowers/src/assets/images');

      const filenameRegex = /^(.+?)(\.[^.]+)?$/;
      const filenameSplit = patht.match(filenameRegex);
      const filename = {
        title: filenameSplit[1].split('/').pop(),
        extension: filenameSplit[2],
      };

      const imageHashed = imagePaths.find((path) => {
        const isEqual = (path.includes(filename.title) && path.includes(filename.extension));
        return isEqual;
      });
      if (typeof type === 'object' && type !== null) {
        src[type.type][type.size].value = imageHashed;
      } else {
        src.default.value = imageHashed;
      }
    }
  };

  options.forEach((option) => {
    const imagesArray = Object.entries(option[1]);
    imagesArray.forEach((image) => {
      const type = {
        type: option[0],
        size: image[0],
      };
      replace(image[1], type);
    });
  });
}());

const url = (path) => {
  const isObject = (typeof path === 'object' && path !== null);
  if (isObject) {
    return path.value;
  }
  return path;
};

const getSet = (set) => {
  const string = [];
  Object.entries(set).forEach((image) => {
    string.push(`${url(image[1])} ${image[0]}`);
  });
  return string;
};

</script>

<template>
  <picture>
    <source
      v-for="(slide, index) in sources"
      :key="index"
      :type="slide[0]"
      :srcset="getSet(src[slide[0]])"
    >
    <img
      class="image"
      :src="url(src['default']['1x'].value)"
      :alt="slideAlt"
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
