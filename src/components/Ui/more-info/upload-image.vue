<template>
  <div class="upload-image full-width">
    <input class="input" ref="input" @change="changeImag" type="file" />
    <div class="text-subtitle1">
      <!-- {{ title }} <MoreInfo v-if="showInfo" :text="imgDesc"></MoreInfo> -->
    </div>
    <div class="q-mt-md img-container card-round bg-blue-grey-1">
      <q-avatar color="white" class="shadow-10 img-action" size="md"
        ><q-icon name="edit"
      /></q-avatar>
      <q-img width="200" @click="clickFileInput" class="img" :src="src" />
    </div>
    <Caption v-if="showCaption" :text="imageHint" />
  </div>
</template>
<script>
import MoreInfo from "components/Ui/more-info/more-info";
import Caption from "components/Ui/more-info/caption";
export default {
  components: {
    // MoreInfo,
    Caption,
  },
  props: {
    imgDesc: {
      type: String,
      default: "Don't forget to add Image descrition",
    },
    showInfo: {
      type: Boolean,
      default: true,
    },
    deleteImage: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "Don't forget to add Title",
    },
    color: {
      type: String,
      default: "red",
    },
    icon: {
      type: String,
      default: "las la-question-circle",
    },
    imgSrc: {
      type: String,
      default: "",
    },
    showCaption: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      src: "placeholder.jpg",
      imageHint:
        "Set the product hover image. Only *.png, *.jpg, *.jpeg, *.webp and *.svg image files are accepted",
    };
  },
  watch: {
    imgSrc(val) {
      if (val) {
        this.src = this.imgSrc;
      } else {
        this.src = "placeholder.jpg";
      }
    },
  },
  methods: {
    changeImag(event) {
      const allwoedType = [
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        "image/webp",
      ];
      const file = event.target.files[0];
      if (allwoedType.indexOf(file.type) !== -1) {
        var imgData = new FileReader();
        imgData.readAsDataURL(file);
        imgData.onload = (e) => {
          this.src = e.target.result;
          this.$emit("uploadFile", file);
        };
      } else {
        // this.$q.notify(
        //   "Sorry! You can't upload image With " + file.type + " Extension"
        // );
      }
    },
    clickFileInput() {
      const input = this.$refs.input;
      input.click();
    },
  },
};
</script>
<style lang="scss" scoped>
.upload-image {
  position: relative;
  overflow: hidden;
  .input {
    position: absolute;
    top: 0;
    left: 0;
    padding-bottom: 20px;
  }
  .img-container {
    position: relative;
    margin-top: 30px;
    .img-action {
      position: absolute;
      right: 10px;
      top: 10px;
    }
    .img {
      cursor: pointer;
      border-radius: 20px !important;
    }
  }
}
</style>
