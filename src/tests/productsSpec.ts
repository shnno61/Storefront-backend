import { Product } from "../models/products.models";

const product1 = new Product();

describe("test the method create in class product", () => {
  it("create method shoudl be found", () => {
    expect(product1.create).toBeDefined();
  });

  it("the create should return an expected values ", () => {
    return product1
      .create({ name: "orange", price: 50, category: "fakha" })
      .then((ress) => {
        expect(ress.name).toEqual("orange");
      });
  });
});

describe("test the method show in class product", () => {
  it("show method should be found", () => {
    expect(product1.show).toBeDefined();
  });
  it("the index should return an expected values ", () => {
    return product1.show(4).then((ress: any) => {
      expect(ress.price).toEqual(50);
    });
  });
});

describe("test the method index in class product", () => {
  it("index method shoudl be found", () => {
    expect(product1.index).toBeDefined();
  });

  it("the index should return an expected values ", () => {
    return product1.index().then((ress: any) => {
      expect(ress[0].name).toEqual("yousfi2");
    });
  });
});

describe("test the method update in class product", () => {
  it("update method shoudl be found", () => {
    expect(product1.update).toBeDefined();
  });

  it("the update should return an expected values ", () => {
    return product1
      .update({ name: "orange", price: 20, category: "fakha" }, 4)
      .then((ress) => {
        expect(ress.price).toEqual(20);
      });
  });
});

describe("test the method top in class product", () => {
  it("top method shoudl be found", () => {
    expect(product1.top).toBeDefined();
  });

  it("the top should return an expected values ", () => {
    return product1.top().then((ress: any) => {
      expect(ress[0].name).toEqual("yousfi2");
    });
  });
});

describe("test the method category in class product", () => {
  it("category method shoudl be found", () => {
    expect(product1.category).toBeDefined();
  });

  it("the category should return an expected values ", () => {
    return product1.category("fakha").then((ress) => {
      expect(ress[0].price).toEqual(20);
    });
  });
});

describe("test the method deleteproduct in class product", () => {
  it("deleteproduct method shoudl be found", () => {
    expect(product1.deleteproduct).toBeDefined();
  });

  it("the deleteproduct should return an expected values ", () => {
    return product1.deleteproduct(4).then((ress) => {
      expect(ress.name).toEqual("orange");
    });
  });
});
