import { shallowMount } from "@vue/test-utils";
import displayQueries from "@/components/DisplayQueries.vue";

describe("DisplayQueries.vue", () => {
    const wrapper = shallowMount(displayQueries);
    const button = wrapper.find('.displayHistory');
    const queries = wrapper.vm.queries;
    const newName = "maRequete";

    beforeAll( async () => {
        await wrapper.setProps({"queryResult": [{test: "validation"}]});
    })

    it("click open the panel", async () => {
        let panel = wrapper.find('.historySidepanelOpen');

        expect(button.attributes("class")).not.toContain("displayHistoryOpen");
        expect(panel.exists()).toBeFalsy();
        expect(wrapper.vm.moveSidePanel).toBeFalsy();

        await button.trigger('click');

        panel = wrapper.find('.historySidepanelOpen');
        expect(button.attributes("class")).toContain("displayHistoryOpen");
        expect(panel.exists()).toBeTruthy();
        expect(wrapper.vm.moveSidePanel).toBeTruthy();

        await button.trigger('click');

        panel = wrapper.find('.historySidepanelOpen');
        expect(button.attributes("class")).not.toContain("displayHistoryOpen");
        expect(panel.exists()).toBeFalsy();
        expect(wrapper.vm.moveSidePanel).toBeFalsy();
    });

    it("emits a signal on click", async () => {
        await button.trigger('click');

        expect(wrapper.emitted().historyOpenState).toBeTruthy();
    });

    it("checkName valid", () => {
        const name = "maRequete";

        expect(wrapper.vm.checkName(name)).toBeTruthy();
    });

    it("rename valid", async () => {
        const time = Date.now();

        expect(queries[0].name).not.toMatch(newName);
        await wrapper.vm.remaneAQuery(newName, 0);
        expect(queries[0].name).toMatch(newName);

        expect(wrapper.emitted().nameUpdated).toBeTruthy();
        const dataEmitted = wrapper.emitted().nameUpdated[1][0];
        expect(dataEmitted.time).toBeGreaterThanOrEqual(time);
        expect(dataEmitted.old).toMatch("Requête 1");
        expect(dataEmitted.new).toMatch(newName);
    });

    it("remove valid", async () => {
        await wrapper.setProps({"queryResult": [{test: "validation"}]});
        await wrapper.setProps({"queryResult": [{test: "validation"}]});
        const time = Date.now();

        expect(queries.length).toEqual(3);
        await wrapper.vm.removeAQuery(1);
        expect(queries.length).toEqual(2);

        expect(wrapper.emitted().removeQuery).toBeTruthy();
        const dataEmitted = wrapper.emitted().removeQuery[0][0];
        expect(dataEmitted.time).toBeGreaterThanOrEqual(time);
        expect(dataEmitted.name).toMatch("Requête 2");

        expect(queries[0].name).toMatch(newName);
        expect(queries[1].name).toMatch("Requête 3");
    });
});