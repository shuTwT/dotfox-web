import { computed, inject } from "vue";

export function useContainer(){
  const getFormConfig = inject("getFormConfig")
  const getGlobalDsv = inject("getGlobalDsv")

  function appendTableRow(widget) {
    this.designer.appendTableRow(widget);
  }

  function appendTableCol(widget) {
    this.designer.appendTableCol(widget);
  }

  function onContainerDragAdd(evt, subList) {
    const newIndex = evt.newIndex;
    if (!!subList[newIndex]) {
      this.designer.setSelected(subList[newIndex]);
    }

    this.designer.emitHistoryChange();
  }

  function onContainerDragUpdate() {
    this.designer.emitHistoryChange();
  }

  function checkContainerMove(evt) {
    return this.designer.checkWidgetMove(evt);
  }

  function selectWidget(widget) {
    this.designer.setSelected(widget);
  }

  function selectParentWidget() {
    if (this.parentWidget) {
      this.designer.setSelected(this.parentWidget);
    } else {
      this.designer.clearSelected();
    }
  }

  function moveUpWidget() {
    this.designer.moveUpWidget(this.parentList, this.indexOfParentList);
    this.designer.emitHistoryChange();
  }

  function moveDownWidget() {
    this.designer.moveDownWidget(this.parentList, this.indexOfParentList);
    this.designer.emitHistoryChange();
  }

  function cloneContainer(widget) {
    if (!!this.parentList) {
      let newCon = this.designer.cloneContainer(widget);
      this.parentList.splice(this.indexOfParentList + 1, 0, newCon);
      this.designer.setSelected(newCon);

      this.designer.emitHistoryChange();
    }
  }

  function removeWidget() {
    if (!!this.parentList) {
      const widgetRefName = this.designer.selectedWidgetName;
      let nextSelected = null;
      if (this.parentList.length === 1) {
        if (!!this.parentWidget) {
          nextSelected = this.parentWidget;
        }
      } else if (this.parentList.length === 1 + this.indexOfParentList) {
        nextSelected = this.parentList[this.indexOfParentList - 1];
      } else {
        nextSelected = this.parentList[this.indexOfParentList + 1];
      }

      this.$nextTick(() => {
        this.parentList.splice(this.indexOfParentList, 1);
        this.designer.setSelected(nextSelected);

        this.designer.formWidget.deleteWidgetRef(widgetRefName); //删除组件ref！！！
        this.designer.emitHistoryChange();
      });
    }
  }

  function setWidgetOption(optionName, optionValue) {
    //通用组件选项修改API
    if (this.widget.options.hasOwnProperty(optionName)) {
      this.widget.options[optionName] = optionValue;
    }
  }

  const formConfig = computed(()=>this.getFormConfig())

  return {
    getFormConfig,
    getGlobalDsv,
    appendTableRow,
    appendTableCol,
    onContainerDragAdd,
    onContainerDragUpdate,
    checkContainerMove,
    selectWidget,
    selectParentWidget,
    moveUpWidget,
    moveDownWidget,
    cloneContainer,
    removeWidget,
    setWidgetOption,
    formConfig
  }
}
