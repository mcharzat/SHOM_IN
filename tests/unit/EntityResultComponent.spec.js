import { shallowMount } from "@vue/test-utils";
import entityResult from "@/components/queryComponents/EntityResult.vue";

describe("EntityResult.vue", () => {
    const data = {
        "uri" : {
            "type" : "uri",
            "value" : "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
        },
        "literal" : {
            "type" : "literal",
            "value" : "Consigne de Navigation"
        },
        "bnode" : {
            "type" : "bnode",
            "value" : "bnode11221"
        }
    };
    const fields = ["uri", "literal", "bnode"];

    it("method checkType", async () => {
        const wrapper = shallowMount(entityResult, {
            propsData: {values: data}
        });

        expect(wrapper.vm.extractFields.length).toEqual(fields.length);
        expect(wrapper.vm.extractFields).toEqual(expect.arrayContaining(fields));

        expect(wrapper.vm.checkType('uri')).toBeFalsy();
        expect(wrapper.vm.checkType('literal')).toBeTruthy();
        expect(wrapper.vm.checkType('bnode')).toBeFalsy();
    });
});