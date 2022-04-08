import { shallowMount } from "@vue/test-utils";
import SPARQLResearch from "@/components/SPARQLResearch.vue";

describe("SPARQLResearch.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = true;
    const wrapper = shallowMount(SPARQLResearch, {
      propsData: { widthResult: msg }
    });
    const researchButton = wrapper.find(".researchManager");

    expect(wrapper.vm.widthResult).toEqual(msg);
    expect(researchButton.attributes("class")).toContain("researchManagerOpen");
  });

  it("check click on button", async () => {
    const wrapper = shallowMount(SPARQLResearch);
    const researchDiv = wrapper.find(".research");

    expect(wrapper.vm.isDisplayed).toBeTruthy();
    expect(researchDiv.isVisible()).toBeTruthy();

    await wrapper.find('button').trigger('click');

    expect(wrapper.vm.isDisplayed).toBeFalsy();
    expect(researchDiv.isVisible()).toBeFalsy();

    await wrapper.find('button').trigger('click');

    expect(wrapper.vm.isDisplayed).toBeTruthy();
    expect(researchDiv.isVisible()).toBeTruthy();
  });
});
