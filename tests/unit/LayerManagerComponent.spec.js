import { shallowMount } from "@vue/test-utils";
import layerManager from "@/components/LayerManager.vue";

describe("LayerManager.vue", () => {
    it("click open the panel", async () => {
        const wrapper = shallowMount(layerManager);
        const button = wrapper.find('button');
        const panel = wrapper.find('.layerManager');
        const variable = wrapper.vm.infSidePanel;

        expect(panel.attributes("class")).not.toContain("layerManagerOpen");
        expect(variable).toBeFalsy;

        await button.trigger('click');

        expect(panel.attributes("class")).toContain("layerManagerOpen");
        expect(variable).toBeTruthy;

        await button.trigger('click');

        expect(panel.attributes("class")).not.toContain("layerManagerOpen");
        expect(variable).toBeFalsy;
    });
});