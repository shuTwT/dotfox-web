import emitter from "@/utils/vform3/emitter";
//import eventBus from "@/utils/event-bus";

export default {
  mixins: [emitter],
  created() {},
  methods: {
    editEventHandler(eventName, eventParams) {
      this.dispatch("SettingPanel", "editEventHandler", [
        eventName,
        [...eventParams]
      ]);
    }
  }
};
