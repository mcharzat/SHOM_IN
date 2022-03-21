import { shallowMount } from "@vue/test-utils";
import navBar from "@/components/NavBar.vue";

describe("NavBar.vue", () => {
    it("default state", async () => {
        const wrapper = shallowMount(navBar);

        expect(wrapper.find(".notLogged").isVisible()).toBeTruthy();
        expect(wrapper.find(".logged").exists()).toBeFalsy();
    });

    it("logged state", async () => {
        const wrapper = shallowMount(navBar);

        await wrapper.find(".notLogged .navBarButton").trigger("click");

        expect(wrapper.find(".notLogged").exists()).toBeFalsy();
        expect(wrapper.find(".logged").isVisible()).toBeTruthy();
    });

    it("connexion", async () => {
        const wrapper = shallowMount(navBar);
        const login = 'Fabrice';
        const pwd = 'FabriceDu75';

        await wrapper.find(".notLogged input[type='text']").setValue(login);
        await wrapper.find(".notLogged input[type='password']").setValue(pwd);

        await wrapper.find(".notLogged .navBarButton").trigger("click");

        const result = wrapper.find(".logged p").text();
        expect(result).toContain(login);
        expect(result).not.toContain("login");

        expect(wrapper.vm.login).toMatch(login);
        expect(wrapper.vm.pwd).toMatch(pwd);
    });

    it("deconnexion", async () => {
        const wrapper = shallowMount(navBar);
        let divLogin = wrapper.find(".notLogged input[type='text']");
        let divPwd = wrapper.find(".notLogged input[type='password']");
        const login = 'Fabrice';
        const pwd = 'FabriceDu75';

        await divLogin.setValue(login);
        await divPwd.setValue(pwd);

        await wrapper.find(".notLogged .navBarButton").trigger("click");
        await wrapper.find(".logged .navBarButton").trigger("click");

        await wrapper.vm.$forceUpdate(); //Doesn't do the job... just a reminder
        divLogin = wrapper.find(".notLogged input[type='text']");
        divPwd = wrapper.find(".notLogged input[type='password']");

        expect(divLogin.element.value).toMatch("login");
        expect(wrapper.vm.login).toMatch("login");
        expect(divLogin.element.value).not.toMatch(login);

        expect(divPwd.element.value).toMatch("pwd");
        expect(wrapper.vm.pwd).toMatch("pwd");
        expect(divPwd.element.value).not.toMatch(pwd);
    });
});