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
        const correctName = "maRequete";
        const incorrectName = "Requête 1";

        expect(wrapper.vm.checkName(correctName)).toBeTruthy();
        expect(wrapper.vm.checkName(incorrectName)).toBeFalsy();
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

    it("check format valid", async () => {
        const correctDataFile = [{
            name: "validation",
            value: [{
                field: {
                    type: "type",
                    value: ["Good"]
                }
            }]
        }];
        const bad1DataFile = [{
            field: {
                type: "type",
                value: ["Good"]
            }
        }];
        const bad2DataFile = [{
            name: "validation",
            value: [{
                field: {
                    type: "type",
                    value: "Good"
                }
            }]
        }];

        expect(wrapper.vm.checkIsWrongFormat(correctDataFile)).toBeFalsy();
        expect(wrapper.vm.checkIsWrongFormat(bad1DataFile)).toBeTruthy();
        expect(wrapper.vm.checkIsWrongFormat(bad2DataFile)).toBeTruthy();
    });

    it("check uploaded name available valid", async () => {
        const correctDataFile = [{
            name: "validation"
        },
        {
            name: "validation2"
        }];
        const bad1DataFile = [{
            name: "maRequete"
        },
        {
            name: "validation2"
        }];
        const bad2DataFile = [{
            name: "validation"
        },
        {
            name: "validation"
        }];

        expect(wrapper.vm.checkIsQueriesNameTaken(correctDataFile)).toBeFalsy();
        expect(wrapper.vm.checkIsQueriesNameTaken(bad1DataFile)).toMatch("maRequete");
        expect(wrapper.vm.checkIsQueriesNameTaken(bad2DataFile)).toMatch("validation");
    });
});