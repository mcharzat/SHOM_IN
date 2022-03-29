import { shallowMount } from "@vue/test-utils";
import displayResearch from "@/components/DisplayResearch.vue";

describe("DisplayResearch.vue", () => {
    it("click open the panel", async () => {
        const wrapper = shallowMount(displayResearch);
        const button = wrapper.find('.displayResearch');
        let panel = wrapper.find('.resultSidepanelOpen');

        expect(button.attributes("class")).not.toContain("displayResearchOpen");
        expect(panel.exists()).toBeFalsy();
        expect(wrapper.vm.infSidePanel).toBeFalsy();

        await button.trigger('click');

        panel = wrapper.find('.resultSidepanelOpen');
        expect(button.attributes("class")).toContain("displayResearchOpen");
        expect(panel.exists()).toBeTruthy();
        expect(wrapper.vm.infSidePanel).toBeTruthy();

        await button.trigger('click');

        panel = wrapper.find('.resultSidepanelOpen');
        expect(button.attributes("class")).not.toContain("displayResearchOpen");
        expect(panel.exists()).toBeFalsy();
        expect(wrapper.vm.infSidePanel).toBeFalsy();
    });
});