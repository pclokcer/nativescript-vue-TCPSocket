<template>
  <Page style="background-color:white">
    <ActionBar>
      <Label :text="name" />
      <!-- <NavigationButton icon="res://ic_arrow_back_black_24dp" (tap)="goBack()"></NavigationButton>-->
      <NavigationButton android.systemIcon="ic_menu_back" @tap="$navigateBack()"></NavigationButton>
    </ActionBar>
    <StackLayout>
      <GridLayout columns="*" rows="*">
        <Button text="index" @tap="onButtonTap" />
      </GridLayout>
    </StackLayout>
  </Page>
</template>

<script>
export default {
  props: ["name", "port", "ip"],
  data() {
    return {};
  },
  methods: {
    onButtonTap() {},
    baglan() {
      this.$store.dispatch("socket_baglan", this.ip, this.port);
    }
  }
};
</script>

<style>
</style>