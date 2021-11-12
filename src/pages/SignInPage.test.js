import { mount } from "enzyme";
import SignInPage from "./SignInPage";

describe("SignInPage", () => {
  test("form is rendered", () => {
    const wrapper = mount(<SignInPage login={() => {}} />);
    expect(wrapper.find("SignInForm")).toBeTruthy();
    const inputs = wrapper.find("input");

    expect(inputs.length).toBe(3);
    const labels = wrapper.find("label");
    const expectedLabels = ["Email address", "Password", "Show password"];
    const expectedInputTypes = ["email", "password", "checkbox"];

    for (let i = 0; i < labels.length; i++) {
      expect(labels.at(i).text()).toBe(expectedLabels[i]);
      expect(inputs.at(i).prop("type")).toBe(expectedInputTypes[i]);
    }

    expect(wrapper.find("Button").length).toBe(1);
  });

  test("password is visible when checkbox is checked", () => {
    const wrapper = mount(<SignInPage login={() => {}} />);
    let pwdInput = wrapper.find("input").at(1);
    const checkbox = wrapper.find("input").at(2);

    expect(pwdInput.prop("type")).toBe("password");
    checkbox.simulate("change", { target: { checked: true } });
    pwdInput = wrapper.find("input").at(1);
    expect(pwdInput.prop("type")).toBe("text");
  });
});
