import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue"
import SPARQLResearch from "@/components/SPARQLResearch.vue";
import DisplayResearch from "@/components/DisplayResearch.vue";

describe("SPARQLResearch.vue", () => {
    it("SPARQLResearch receive signal from DisplayResearch", async () => {
        const wrapper = shallowMount(App, {
            global: {
                stubs: {
                    SPARQLResearch: false,
                    DisplayResearch: false
                },
            }
        });
        const wrapperResearch = wrapper.getComponent(SPARQLResearch);
        const wrapperPdf = wrapper.getComponent(DisplayResearch);
        const buttonResearch = wrapperResearch.find('.researchManager');
        const buttonPdf = wrapperPdf.find('.displayResearch');
        
        expect(wrapperResearch.vm.widthResult).toBeFalsy();
        expect(buttonResearch.attributes('class')).not.toContain("researchManagerOpen");

        await buttonPdf.trigger('click');
        
        expect(wrapperResearch.vm.widthResult).toBeTruthy();
        expect(buttonResearch.attributes('class')).toContain("researchManagerOpen");

        await buttonPdf.trigger('click');

        expect(wrapperResearch.vm.widthResult).toBeFalsy();
        expect(buttonResearch.attributes('class')).not.toContain("researchManagerOpen");
    });
});