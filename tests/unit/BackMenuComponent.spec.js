import { shallowMount } from "@vue/test-utils";
import backMenu from "@/components/BackMenu.vue";

describe("BackMenu.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = true;
    const wrapper = shallowMount(backMenu, {
      propsData: { widthPdf: msg }
    });
    const BackButton = wrapper.find(".backMenu");

    expect(wrapper.vm.widthPdf).toEqual(msg);
    expect(BackButton.attributes("class")).toContain("backMenuOpen");
  });

  it("emits a signal on click", async () => {
    const wrapper = shallowMount(backMenu);
    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted().openMenu).toBeTruthy();
})
});