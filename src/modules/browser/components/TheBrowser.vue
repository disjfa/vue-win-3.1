<template>
  <div class="browser">
    <div class="input-group">
      <input
        type="url"
        class="form-control"
        v-model="theurl"
        placeholder="Please enter url"
        @keydown.enter="enterUrl"
      >
      <div class="input-group-append">
        <button class="btn btn-default" type="button" @click.stop="enterUrl">
          <i class="fa fa-fw fa-arrow-right"></i>
        </button>
      </div>
    </div>
    <iframe v-if="mainurl" :src="getMainurl()" frameborder="0" class="browser-frame" @load="checkUrl" ref="iframe"></iframe>
    <div v-if="!mainurl" class="p-3 bg-light browser-frame">
      Welcome to the browser. It tries to load content using https, but it sometimes wont work.
    </div>
  </div>
</template>

<script>
export default {
  name: 'the-browser',
  data() {
    return {
      theurl: '',
      mainurl: '',
    };
  },
  methods: {
    checkUrl(evt) {
      // console.log(this.$refs.iframe.contentWindow.location);
    },
    enterUrl() {
      let { theurl } = this;
      if (theurl.indexOf('https://') === -1) {
        theurl = theurl.replace('http://', '');
        theurl = `https://${theurl}`;
      }
      this.mainurl = theurl;
    },
    getMainurl() {
      return this.mainurl;
    },
  },
};
</script>
