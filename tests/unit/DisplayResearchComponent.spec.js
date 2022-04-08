import { shallowMount } from "@vue/test-utils";
import displayResearch from "@/components/DisplayResearch.vue";

describe("DisplayResearch.vue", () => {
    const wrapper = shallowMount(displayResearch);
    const button = wrapper.find('.displayResearch');

    it("click open the panel", async () => {
        let panel = wrapper.find('.resultSidepanelOpen');

        expect(button.attributes("class")).not.toContain("displayResearchOpen");
        expect(panel.exists()).toBeFalsy();
        expect(wrapper.vm.moveSidePanel).toBeFalsy();

        await button.trigger('click');

        panel = wrapper.find('.resultSidepanelOpen');
        expect(button.attributes("class")).toContain("displayResearchOpen");
        expect(panel.exists()).toBeTruthy();
        expect(wrapper.vm.moveSidePanel).toBeTruthy();

        await button.trigger('click');

        panel = wrapper.find('.resultSidepanelOpen');
        expect(button.attributes("class")).not.toContain("displayResearchOpen");
        expect(panel.exists()).toBeFalsy();
        expect(wrapper.vm.moveSidePanel).toBeFalsy();
    });

    it("emits a signal on click", async () => {
        await button.trigger('click');

        expect(wrapper.emitted().resultOpenState).toBeTruthy();
    })
});