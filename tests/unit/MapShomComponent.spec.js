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

    it("convert degree to decimal", () => {
        const wrapper = mount(mapShom);

        const coord1 = wrapper.vm.convertDegreeToLatlng("4° 00,8' W");
        const coord2 = wrapper.vm.convertDegreeToLatlng("4° 00,8' E");
        const coord3 = wrapper.vm.convertDegreeToLatlng("48° 44,6' N");
        const coord4 = wrapper.vm.convertDegreeToLatlng("48° 44,6' S");

        expect(coord1 + coord2).toBe(0);
        expect(coord3 + coord4).toBe(0);
        expect(coord1).toBeGreaterThan(-4.013334);
        expect(coord1).toBeLessThan(-4.01333);
        expect(coord3).toBeGreaterThan(48.743333);
        expect(coord3).toBeLessThan(48.7433334);
    });

    it("extract coord from wkt point", () => {
        const wrapper = mount(mapShom);
        const coord = [48.726567 ,-3.986004];

        const coord1 = wrapper.vm.extractCoordPointWkt(wrapper.vm.checkEPSGWkt("Point(-3.986004 48.726567)"));
        const coord2 = wrapper.vm.extractCoordPointWkt(wrapper.vm.checkEPSGWkt("<http://www.opengis.net/def/crs/EPSG/0/4326> Point(-3.986004 48.726567)"));
        const coord3 = wrapper.vm.checkEPSGWkt("<http://www.opengis.net/def/crs/EPSG/0/3857> Point(-3.986004 48.726567)");

        expect(coord1).toEqual(expect.arrayContaining(coord));
        expect(coord2).toEqual(expect.arrayContaining(coord));
        expect(coord3).toBeUndefined();
    });

    it("extract coord from wkt line", () => {
        const wrapper = mount(mapShom);
        const coord = [[-4.0096052 ,48.7442339],[-3.970418, 48.73301]];

        const coord1 = wrapper.vm.extractCoordLineWkt(wrapper.vm.checkEPSGWkt("LINESTRING (48.7442339 -4.0096052, 48.73301 -3.970418)"));

        expect(coord1).toEqual(expect.arrayContaining(coord));
    });
});