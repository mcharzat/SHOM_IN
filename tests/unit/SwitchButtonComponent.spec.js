import { shallowMount } from "@vue/test-utils";
import switchButton from "@/components/SwitchButton.vue";

describe("SwitchButton.vue", () => {
    it("click open the panel", async () => {
        const wrapper = shallowMount(switchButton);

        expect(wrapper.find(".selectButton")).toBeTruthy();
    });
});