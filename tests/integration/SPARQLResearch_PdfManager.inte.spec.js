import { shallowMount, mount } from "@vue/test-utils";
import App from "@/App.vue"
import SPARQLResearch from "@/components/SPARQLResearch.vue";
import PDFManager from "@/components/PDFManager.vue";

describe("SPARQLResearch.vue", () => {
    it("SPARQLResearch receive signal from PDFManager", async () => {
        const wrapper = shallowMount(App, {
            global: {
                stubs: {
                    SPARQLResearch: false,
                    PDFManager: false
                },
            }
        });
        const wrapperResearch = wrapper.getComponent(SPARQLResearch);
        const wrapperPdf = wrapper.getComponent(PDFManager);
        const buttonResearch = wrapperResearch.find('.researchManager');
        const buttonPdf = wrapperResearch.find('.pdfManager');
        
        expect(wrapperResearch.vm.widthPdf).toBeFalsy();
        expect(buttonResearch.attributes('class')).not.toContain("researchManagerOpen");

        await buttonPdf.trigger('click');
        
        expect(wrapperResearch.vm.widthPdf).toBeTruthy();
        expect(buttonResearch.attributes('class')).toContain("researchManagerOpen");

        await buttonPdf.trigger('click');

        expect(wrapperResearch.vm.widthPdf).toBeFalsy();
        expect(buttonResearch.attributes('class')).not.toContain("researchManagerOpen");
    });
});