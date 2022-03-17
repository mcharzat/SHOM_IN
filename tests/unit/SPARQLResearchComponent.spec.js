import { shallowMount } from "@vue/test-utils";
import SPARQLResearch from "@/components/SPARQLResearch.vue";

describe("SPARQLResearch.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = 15;
    const wrapper = shallowMount(SPARQLResearch, {
      propsData: { widthPdf: msg }
    });
    expect(wrapper.vm.widthPdf).toEqual(msg);
  });
});
