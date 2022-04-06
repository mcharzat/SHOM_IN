import { shallowMount } from "@vue/test-utils";
import BackMenu from "@/components/BackMenu.vue";

describe("BackMenu.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = true;
    const wrapper = shallowMount(BackMenu, {
      propsData: { widthPdf: msg }
    });
    const BackButton = wrapper.find(".backMenu");

    expect(wrapper.vm.widthPdf).toEqual(msg);
    expect(BackButton.attributes("class")).toContain("backMenuOpen");
  });

  it("check click on button", async () => {

  });
});