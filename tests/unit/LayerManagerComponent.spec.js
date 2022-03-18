import { shallowMount } from "@vue/test-utils";
import layerManager from "@/components/LayerManager.vue";

describe("LayerManager.vue", () => {
    it("click open the panel", async () => {
        const wrapper = shallowMount(layerManager);
        const button = wrapper.find('button');
        const panel = wrapper.find('.layerManager');

        expect(panel.attributes("class")).not.toContain("layerManagerOpen");
        expect(wrapper.vm.infSidePanel).toBeFalsy();

        await button.trigger('click');

        expect(panel.attributes("class")).toContain("layerManagerOpen");
        expect(wrapper.vm.infSidePanel).toBeTruthy();

        await button.trigger('click');

        expect(panel.attributes("class")).not.toContain("layerManagerOpen");
        expect(wrapper.vm.infSidePanel).toBeFalsy();
    });
});