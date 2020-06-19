<template>
  <Page style="background-color:white">
    <ActionBar>
      <Label text="Ana Sayfa" />
      <ActionItem
        @tap="addSave()"
        android.systemIcon="ic_menu_btn_add"
        android.position="actionBar"
      ></ActionItem>
    </ActionBar>
    <StackLayout>
      <GridLayout columns="*" :rows="rows" v-for="(item,index) in depo" :key="index">
        <Button :row="index" :text="index" @tap="onButtonTap" />
      </GridLayout>
    </StackLayout>
  </Page>
</template>

<script>
import localStorage from "tns-core-modules/application-settings";
import ConnectPage from "./ConnectPage";

export default {
  data() {
    return {
      depo: []
    };
  },
  computed: {
    rows: function() {
      const rows = [];
      for (let i = 0; i < this.depo.length; i++) {
        rows.push("auto");
      }
      return rows.join(",");
    }
  },
  methods: {
    onButtonTap() {
      this.depo.push("tesss kanasda");
    },
    dataList() {},
    addSave() {
      this.$navigateTo(ConnectPage, {
        props: { name: "value", ip: "pp", port: "port" },
        animated: true,
        transition: {
          name: "slideLeft",
          duration: 380,
          curve: "easeIn"
        }
      });
    }
  },
  created() {
    this.onButtonTap();
    // await localStorage.setString("saves", "allData");
  }
};
</script>

<style scoped lang="scss">
@import "~@nativescript/theme/scss/variables/blue";

// Custom styles
.fas {
  @include colorize($color: accent);
}

.info {
  font-size: 20;
  horizontal-align: center;
  vertical-align: center;
}
</style>
