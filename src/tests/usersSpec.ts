import { User } from "../models/users.models";

const user1 = new User();

describe("test the method create in class user", () => {
  it("create method shoudl be found", () => {
    expect(user1.create).toBeDefined();
  });

  it("the index should return an expected values ", () => {
    return user1
      .create({ first_name: "shn2", last_name: "shn2", passs: "shn2" })
      .then((ress) => {
        expect(ress.first_name).toEqual("shn2");
      });
  });
});

describe("test the method show in class user", () => {
  it("show method shoudl be found", () => {
    expect(user1.show).toBeDefined();
  });
  it("the index should return an expected values ", () => {
    return user1.show(1).then((ress: any) => {
      expect(ress.last_name).toEqual("shn5");
    });
  });
});

describe("test the method index in class user", () => {
  it("index method shoudl be found", () => {
    expect(user1.index).toBeDefined();
  });

  it("the index should return an expected values ", () => {
    return user1.index().then((ress: any) => {
      expect(ress[0].first_name).toEqual("shn5");
    });
  });
});

describe("test the method update in class user", () => {
  it("update method shoudl be found", () => {
    expect(user1.update).toBeDefined();
  });

  it("the update should return an expected values ", async () => {
    return user1
      .update({ first_name: "shn3", last_name: "shn3", passs: "shn3" }, 4)
      .then((ress: any) => {
        expect(ress.first_name).toEqual("shn3");
      });
  });
});

describe("test the method deleteuser in class user", () => {
  it("deleteuser method shoudl be found", () => {
    expect(user1.deleteuser).toBeDefined();
  });

  it("the deleteuser should return an expected values ", () => {
    return user1.deleteuser(4).then((ress: any) => {
      expect(ress.first_name).toEqual("shn3");
    });
  });
});
