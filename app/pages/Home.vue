<template>
  <Page class="page">
    <ActionBar>
      <Label text="Ana Sayfa" />
      <!--<ActionItem
        @tap="addSave()"
        android.systemIcon="ic_menu_btn_add"
        android.position="actionBar"
      ></ActionItem>-->
    </ActionBar>
    <GridLayout columns="*" rows="auto,auto,auto,auto,auto">
      <StackLayout col="0" row="0">
        <GridLayout columns="*" rows="auto,auto">
          <TextField
            class="-border -rounded m-t-10 text"
            style="color:black;"
            hint="Başlık Giriniz"
            col="0"
            row="0"
            v-model="name"
          />
          <GridLayout col="0" row="1" columns="*,130" rows="auto">
            <TextField
              class="-border -rounded m-t-10 text"
              style="color:black;"
              hint="IP Giriniz"
              v-model="ip"
              col="0"
              row="0"
            />
            <TextField
              class="-border -rounded m-t-10 text"
              style="color:black;"
              hint="Port Giriniz"
              v-model="port"
              col="1"
              row="0"
            />
          </GridLayout>
        </GridLayout>
      </StackLayout>
      <StackLayout col="0" row="1">
        <Button androidElevation="6" class="btn -rounded-lg" text="Ekle" @tap="Ekle" />
      </StackLayout>
      <StackLayout col="0" row="2" class="hr m-10"></StackLayout>
      <StackLayout class="m-b-3" col="0" row="3">
        <Label class="text-left m-l-15 h3" style="color:black;" text="Kayıtlar" />
      </StackLayout>
      <ScrollView col="0" row="4">
        <StackLayout>
          <GridLayout columns="*" :rows="rows" v-for="(item,index) in depo" :key="index">
            <GridLayout
              @tap="onButtonTap(item.name,item.ip,item.port)"
              class="m-b-10 m-l-5 m-r-5 saves m-t-5"
              columns="*"
              rows="auto,auto"
              style="border-radius:30px;"
              androidElevation="6"
            >
              <Label
                col="0"
                row="0"
                class="text-left m-l-15 m-t-5 h4"
                style="color:black;"
                :text="item.name"
              />
              <GridLayout col="0" row="1" columns="*,150" rows="auto">
                <Label
                  col="0"
                  row="0"
                  class="text-left m-l-15 m-b-5 h4"
                  style="color:black;"
                  :text="'IP: ' + item.ip"
                />
                <Label
                  col="1"
                  row="0"
                  class="text-left m-l-15 m-b-5 h4"
                  style="color:black;"
                  :text="'PORT: ' + item.port"
                />
              </GridLayout>
            </GridLayout>
            <!--<Button
            class="btn -rounded-lg"
            :row="index"
            :text="item.name"
            @tap="onButtonTap(item.name,item.ip,item.port)"
            />-->
          </GridLayout>
        </StackLayout>
      </ScrollView>
    </GridLayout>
  </Page>
</template>

<script>
import localStorage from "tns-core-modules/application-settings";
import ConnectPage from "./ConnectPage";

export default {
  data() {
    return {
      depo: [
        { name: "test", ip: "192.168.1.7", port: "3000" },
        { name: "server", ip: "176.235.81.119", port: "3306" }
      ],
      ip: "",
      port: "",
      name: ""
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
    onButtonTap(name, ip, port) {
      this.$navigateTo(ConnectPage, {
        props: { name: name, ip: ip, port: port },
        animated: true,
        transition: {
          name: "slideLeft",
          duration: 380,
          curve: "easeIn"
        }
      });
    },
    Ekle() {
      if (this.name == "" || this.ip == "" || this.port == "") return;
      this.depo.push({ name: this.name, ip: this.ip, port: this.port });
      this.name = "";
      this.ip = "";
      this.port = "";
    }
  },
  created() {}
};
</script>

<style scoped>
.btn {
  background-color: coral;
}
.text {
  border-color: gray;
}
.page {
  background-color: rgb(241, 241, 241);
}
.saves {
  background-color: white;
}
</style>

<!--<style scoped lang="scss">
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
</style>-->
