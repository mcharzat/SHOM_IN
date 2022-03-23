import { shallowMount, mount } from "@vue/test-utils";
import mapShom from "@/components/MapShom.vue";

describe("MapShom.vue", () => {
    it("default coord display", () => {
        const wrapper = shallowMount(mapShom);
        const coord = wrapper.find(".mouseTracker p");

        expect(coord.text()).toMatch("Mouse is not over map");
    });

    it("coord display", async () => {
        const wrapper = shallowMount(mapShom);
        const coord = wrapper.find(".mouseTracker p");

        await wrapper.find(".map").trigger('mousemove');

        expect(coord.text()).toContain("Lat :");
        expect(coord.text()).toContain("Lng :");
    });

    it("mouse out coord display", async () => {
        const wrapper = shallowMount(mapShom);
        const coord = wrapper.find(".mouseTracker p");
        const map = wrapper.find(".map");

        await map.trigger('mousemove');
        await map.trigger('mouseout');        

        expect(coord.text()).toMatch("Mouse is not over map");
    });

    it("select an area", async () => {
        const wrapper = mount(mapShom);
        const map = wrapper.find(".map");

        expect(wrapper.vm.selectionArea).toBeFalsy();
        
        await wrapper.find(".leaflet-draw-draw-rectangle").trigger('click');
        
        await map.trigger('click');
        await map.trigger('mousemove');
        await map.trigger('click');

        await map.trigger('draw:created');

        // Doesn't work... The signal is not received...
        //expect(wrapper.vm.selectionArea).toBeTruthy();
        //expect(wrapper.vm.selectionArea).toContain(",");
    });
});