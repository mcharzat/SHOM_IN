import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";
import SPARQLResearch from "@/components/SPARQLResearch.vue";
import DisplayResearch from "@/components/DisplayResearch.vue";
import EntityResult from "@/components/queryComponents/EntityResult.vue";

describe("EntityResult.vue", () => {
    const data = {
        "head" : {
            "vars" : [
                "uri",
                "literal",
                "bnode"
            ]
        },
        "results" : {
            "bindings" : [ 
                {"uri" : {
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
                }},
                {"uri" : {
                    "type" : "uri",
                    "value" : "http://www.w3.org/1999/02/22-rdf-syntax-ns#typeA"
                },
                "literal" : {
                    "type" : "literal",
                    "value" : "Consigne de Navigation en eaux troubles"
                },
                "bnode" : {
                    "type" : "bnode",
                    "value" : "bnode785469"
                }}
            ]
        }
    };

    it("EntityResult receive signal from QuerySPARQL", async () => {
        const wrapper = shallowMount(App, {
            global: {
                stubs: {
                    DisplayResearch: false,
                    EntityResult: false,
                    SPARQLResearch: false
                },
            }
        });
        const wrapperResearch = wrapper.getComponent(SPARQLResearch);
        const wrapperDisplay = wrapper.getComponent(DisplayResearch);
        expect(wrapperDisplay.findComponent(EntityResult).exists()).toBeFalsy();

        await wrapperDisplay.find('.displayResearch').trigger('click');
        expect(wrapperDisplay.findComponent(EntityResult).exists()).toBeFalsy();

        await wrapperResearch.vm.conveyResult(data);
        
        expect(wrapperDisplay.vm.data).toMatchObject(data.results.bindings);

        expect(wrapperDisplay.findComponent(EntityResult).exists()).toBeTruthy();
        const wrapperEntity = wrapperDisplay.findAllComponents(EntityResult);
        expect(wrapperEntity[0].vm.values).toMatchObject(data.results.bindings[0]);
        expect(wrapperEntity[1].vm.values).toMatchObject(data.results.bindings[1]);
    });
});
