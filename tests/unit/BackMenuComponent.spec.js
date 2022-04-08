import { shallowMount } from "@vue/test-utils";
import backMenu from "@/components/BackMenu.vue";

describe("BackMenu.vue", () => {
  const msg = true;
  const wrapper = shallowMount(backMenu, {
    propsData: { widthPdf: msg},
    data() {
      return {
        buttonState: true
      }
    }
  });
  const BackButton = wrapper.find('.backMenu');

  it("renders props.msg when passed", () => {
    expect(wrapper.vm.widthPdf).toEqual(msg);
    expect(BackButton.attributes("class")).toContain('backMenuOpen');
  });

  it("emits a signal on click", async () => {
    await BackButton.trigger('click');

    expect(wrapper.emitted().openMenu).toBeTruthy();
})
});