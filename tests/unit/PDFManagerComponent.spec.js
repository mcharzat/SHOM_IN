import { shallowMount } from "@vue/test-utils";
import pdfManager from "@/components/PDFManager.vue";

describe("PDFManager.vue", () => {
    it("click open the panel", async () => {
        const wrapper = shallowMount(pdfManager);
        const button = wrapper.find('button');
        const panel = wrapper.find('.pdfManager');

        expect(panel.attributes("class")).not.toContain("pdfManagerOpen");
        expect(wrapper.vm.infSidePanel).toBeFalsy();

        await button.trigger('click');

        expect(panel.attributes("class")).toContain("pdfManagerOpen");
        expect(wrapper.vm.infSidePanel).toBeTruthy();

        await button.trigger('click');

        expect(panel.attributes("class")).not.toContain("pdfManagerOpen");
        expect(wrapper.vm.infSidePanel).toBeFalsy();
    });
/*
    it("emits a signal on click", async () => {
        const wrapper = shallowMount(pdfManager);
        await wrapper.find('button').trigger('click');

        expect(wrapper.emitted().pdfOpenState).toBeTruthy();
    })*/
});