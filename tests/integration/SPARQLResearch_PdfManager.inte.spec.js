import { shallowMount } from "@vue/test-utils";
import SPARQLResearch from "@/components/SPARQLResearch.vue";
import PDFManager from "@/components/PDFManager.vue";

describe("SPARQLResearch.vue", () => {
    it("SPARQLResearch receive signal from PDFManager", async () => {
        
        const wrapperResearch = shallowMount(SPARQLResearch);
        const wrapperPdf = shallowMount(PDFManager);
        
        expect(wrapperResearch.vm.widthPdf).toBeFalsy;

        await wrapperPdf.find('button').trigger('click');
        
        expect(wrapperResearch.vm.widthPdf).toBeTruthy;
    });
});