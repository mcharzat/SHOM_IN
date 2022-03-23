import { shallowMount } from "@vue/test-utils";
import layerManager from "@/components/LayerManager.vue";

describe("LayerManager.vue", () => {
    it("click open the panel", async () => {
        const wrapper = shallowMount(layerManager);
        const button = wrapper.find('.layerManager');
        let panel = wrapper.find('.layerSidepanelOpen');

        expect(button.attributes("class")).not.toContain("layerManagerOpen");
        expect(panel.exists()).toBeFalsy();
        expect(wrapper.vm.infSidePanel).toBeFalsy();

        await button.trigger('click');

        panel = wrapper.find('.layerSidepanelOpen');
        expect(button.attributes("class")).toContain("layerManagerOpen");
        expect(panel.exists()).toBeTruthy();
        expect(wrapper.vm.infSidePanel).toBeTruthy();

        await button.trigger('click');

        panel = wrapper.find('.layerSidepanelOpen');
        expect(button.attributes("class")).not.toContain("layerManagerOpen");
        expect(panel.exists()).toBeFalsy();
        expect(wrapper.vm.infSidePanel).toBeFalsy();
    });
});