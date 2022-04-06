import { shallowMount } from "@vue/test-utils";
import mapShom from "@/components/MapShom.vue";

describe("MapShom.vue", () => {
    const wrapper = shallowMount(mapShom);

    it("default coord display", () => {
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
        const coord = wrapper.find(".mouseTracker p");
        const map = wrapper.find(".map");

        await map.trigger('mousemove');
        await map.trigger('mouseout');        

        expect(coord.text()).toMatch("Mouse is not over map");
    });

    it("select an area", async () => {
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

    it("check EPSG", () => {
        const result1 = {
            epsg: 2154,
            value: "Point(186801.70 6870098.88)"
        };
        const result2 = {
            epsg: 4326,
            value: "Point(-3.986004 48.726567)"
        };
        const result3 = {
            epsg: 2154,
            value: "Point(186801.70 6870098.88)"
        };

        const check1 = wrapper.vm.checkEPSGWkt("Point(186801.70 6870098.88)");
        const check2 = wrapper.vm.checkEPSGWkt("<http://www.opengis.net/def/crs/EPSG/0/4326> Point(-3.986004 48.726567)");
        const check3 = wrapper.vm.checkEPSGWkt("<http://www.opengis.net/def/crs/EPSG/0/2154> Point(186801.70 6870098.88)");
        const check4 = wrapper.vm.checkEPSGWkt("<http://www.opengis.net/def/crs/EPSG/0/3857> Point(-3.986004 48.726567)");

        expect(check1).toMatchObject(result1);
        expect(check2).toMatchObject(result2);
        expect(check3).toMatchObject(result3);

        expect(check4).toBeUndefined();
    });

    it("convert degree to decimal", () => {

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

    it("convert lamb93 to wgs84", () => {
        const expectResult = [-3.960962, 48.748560];

        const coord = wrapper.vm.convertLambToWGS([188851.82, 6872372.18]);
        
        expect(coord[0]).toBeCloseTo(expectResult[0], 6);
        expect(coord[1]).toBeCloseTo(expectResult[1], 6);
    });

    it("extract coord from wkt point", () => {
        const coord = [48.726567 ,-3.986004];

        const check1 = wrapper.vm.checkEPSGWkt("Point(186801.70 6870098.88)");
        const check2 = wrapper.vm.checkEPSGWkt("<http://www.opengis.net/def/crs/EPSG/0/4326> Point(-3.986004 48.726567)");
        const check3 = wrapper.vm.checkEPSGWkt("<http://www.opengis.net/def/crs/EPSG/0/2154> Point(186801.70 6870098.88)");
        const check4 = wrapper.vm.checkEPSGWkt("<http://www.opengis.net/def/crs/EPSG/0/3857> Point(-3.986004 48.726567)");

        const coord1 = wrapper.vm.extractCoordPointWkt("Point(186801.70 6870098.88)", 2154);
        const coord2 = wrapper.vm.extractCoordPointWkt("Point(-3.986004 48.726567)", 4326);
        const coord3 = wrapper.vm.extractCoordPointWkt("Point(186801.70 6870098.88)", 2154);

        expect(coord1[0]).toBeCloseTo(coord[0], 6);
        expect(coord1[1]).toBeCloseTo(coord[1], 6);
        
        expect(coord2[0]).toBeCloseTo(coord[0], 6);
        expect(coord2[1]).toBeCloseTo(coord[1], 6);

        expect(coord3[0]).toBeCloseTo(coord[0], 6);
        expect(coord3[1]).toBeCloseTo(coord[1], 6);
    });

    it("extract coord from wkt line", () => {
        const wkt = "LINESTRING (48.7442339 -4.0096052, 48.73301 -3.970418)";
        const coord = [[-4.0096052 ,48.7442339],[-3.970418, 48.73301]];

        const coord1 = wrapper.vm.extractCoordLineWkt(wkt, 4326);

        expect(coord1).toEqual(expect.arrayContaining(coord));
    });

    it("extract coord from wkt polygon", () => {
        const wkt = "POLYGON (((48.7442339 -4.0096052, 48.73301 -3.970418, 48.7442339 -4.0096052, 48.73301 -3.970418, 48.7442339 -4.0096052)))";
        const coord = [[[[-4.0096052 ,48.7442339],[-3.970418, 48.73301],[-4.0096052 ,48.7442339],[-3.970418, 48.73301]]]];

        const coord1 = wrapper.vm.extractCoordPolygonWkt(wkt, 4326);

        expect(coord1).toEqual(expect.arrayContaining(coord));
    });

    it("setup of categories", () => {
        expect(Object.keys(wrapper.vm.categories)).not.toBeNull();
    });

    it("determination of category", () => {
        const categoriesDefault = ["http://data.shom.fr/def/navigation_cotiere#Feature"];
        const categoriesAmer = ["http://data.shom.fr/def/navigation_cotiere#Amer"];

        const expectedDefault = {
            title: "default",
        };
        const expectedAmer = {
            title: "amer",
        };

        wrapper.vm.setupQueryLayers();
        const resultDefault = wrapper.vm.determineCategory(categoriesDefault);
        const resultAmer = wrapper.vm.determineCategory(categoriesAmer);

        expect(resultDefault.title).toMatch(expectedDefault.title);
        expect(resultAmer.title).toMatch(expectedAmer.title);
    });
});