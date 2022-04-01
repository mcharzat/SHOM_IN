import { shallowMount } from "@vue/test-utils";
import pdfManager from "@/components/PDFManager.vue";

describe("PDFManager.vue", () => {
    it("click open the panel", async () => {
        const wrapper = shallowMount(pdfManager);
        const button = wrapper.find('.pdfManager');
        let panel = wrapper.find('.pdfSidepanelOpen');

        expect(button.attributes("class")).not.toContain("pdfManagerOpen");
        expect(panel.exists()).toBeFalsy();
        expect(wrapper.vm.infSidePanel).toBeFalsy();

        await button.trigger('click');

        panel = wrapper.find('.pdfSidepanelOpen');
        expect(button.attributes("class")).toContain("pdfManagerOpen");
        expect(panel.exists()).toBeTruthy();
        expect(wrapper.vm.infSidePanel).toBeTruthy();

        await button.trigger('click');

        panel = wrapper.find('.pdfSidepanelOpen');
        expect(button.attributes("class")).not.toContain("pdfManagerOpen");
        expect(panel.exists()).toBeFalsy();
        expect(wrapper.vm.infSidePanel).toBeFalsy();
    });
});