<template>
  <Page class="page">
    <ActionBar>
      <Label :text="name" />
      <!-- <NavigationButton icon="res://ic_arrow_back_black_24dp" (tap)="goBack()"></NavigationButton>-->
      <NavigationButton android.systemIcon="ic_menu_back" @tap="$navigateBack()"></NavigationButton>
    </ActionBar>
    <GridLayout columns="*" rows="auto,auto,auto">
      <GridLayout col="0" row="0" columns="*,*" rows="auto">
        <Button
          :isEnabled="$store.state.connectButton"
          col="0"
          row="0"
          androidElevation="6"
          class="btn -rounded-lg"
          text="Bağlan"
          @tap="baglan"
        />
        <Button
          :isEnabled="$store.state.cuteButton"
          col="1"
          row="0"
          androidElevation="6"
          class="btn -rounded-lg"
          text="Bağlantıyı Kes"
          @tap="cute"
        />
      </GridLayout>
      <GridLayout col="0" row="1" columns="*" rows="auto,150,auto,170">
        <Label col="0" row="0" class="text-left m-l-15 h3 m-t-5" style="color:black;" text="Gelen" />
        <ScrollView
          class="m-l-15 m-r-15"
          style="border-radius:30px; background-color: white;"
          androidElevation="6"
          col="0"
          row="1"
          scrollBarIndicatorVisible="false"
        >
          <StackLayout>
            <Label
              col="0"
              row="0"
              class="text-left m-l-15 h3 m-t-5 m-b-5 body"
              style="color:black;"
              :text="'Sunucu: ' + item"
              v-for="(item,index) in $store.state.clients"
              :key="index"
            />
          </StackLayout>
        </ScrollView>
        <Label
          col="0"
          row="2"
          class="text-left m-l-15 h3 m-t-20 body"
          style="color:black;"
          text="Giden"
        />
        <ScrollView
          col="0"
          row="3"
          class="m-l-15 m-r-15 m-b-8"
          style="border-radius:30px; background-color: white;"
          androidElevation="6"
          scrollBarIndicatorVisible="false"
        >
          <StackLayout>
            <Label
              col="0"
              row="0"
              class="text-left m-l-15 h3 m-t-5"
              style="color:black;"
              :text="'Sen: ' + item"
              v-for="(item,index) in sendMessage"
              :key="index"
            />
          </StackLayout>
        </ScrollView>
      </GridLayout>
      <GridLayout col="0" row="2" columns="*" rows="auto,auto">
        <TextField
          class="-border -rounded m-t-10 text"
          style="color:black;border-color: gray;"
          hint="Yazınız..."
          v-model="text"
          col="0"
          row="0"
        />
        <Button
          :isEnabled="$store.state.buttonStatus"
          col="0"
          row="1"
          androidElevation="6"
          class="btn -rounded-lg"
          text="Gönder"
          @tap="asciiTohex"
        />
      </GridLayout>
    </GridLayout>
  </Page>
</template>

<script>
export default {
  props: ["name", "port", "ip"],
  data() {
    return {
      sendMessage: [],
      text: ""
    };
  },
  methods: {
    send() {
      this.$store.dispatch("send_message", this.text);
      this.sendMessage.push(this.text);
      this.text = "";
    },
    baglan() {
      this.$store.dispatch("socket_baglan", { ip: this.ip, port: this.port });

    /*  this.$store.state.buttonStatus = true;
      this.$store.state.connectButton = false;
      this.$store.state.cuteButton = true;*/
    },
    asciiTohex() {
      var arr1 = [];
      for (var n = 0, l = this.text.length; n < l; n++) {
        var hex = Number(this.text.charCodeAt(n)).toString(16);
        arr1.push(hex);
        console.log(arr1);
      }

      return arr1.join("");
    },
    cute() {
      this.$store.dispatch("socket_close");
      this.$store.state.buttonStatus = false;
      this.$store.state.connectButton = true;
      this.$store.state.cuteButton = false;
    }
  },
  beforeDestroy() {
    this.cute();
    this.text = "";
    this.sendMessage = [];
    this.$store.state.clients = [];
  }
};
</script>

<style scoped>
.page {
  background-color: rgb(241, 241, 241);
}
</style>