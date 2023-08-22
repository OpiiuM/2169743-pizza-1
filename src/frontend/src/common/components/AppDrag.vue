<template>
  <div
    :draggable="draggable"
    @dragstart.stop="onDrag"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot />
  </div>
</template>

<script>
import { DATA_TRANSFER_PAYLOAD } from "@/common/constants";

export default {
  name: "AppDrag",

  props: {
    draggable: {
      type: Boolean,
      default: false,
    },
    dataTransfer: {
      type: Object,
      required: true,
    },
  },

  methods: {
    onDrag({ dataTransfer }) {
      dataTransfer.setData(
        DATA_TRANSFER_PAYLOAD,
        JSON.stringify(this.dataTransfer)
      );
    },
  },
};
</script>
