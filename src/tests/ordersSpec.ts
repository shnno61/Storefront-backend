import { Order } from "../models/orders.models";
 
const order1 = new Order();

describe("test the method start_order in class Order", () => {
  it("create method shoudl be found", async () => {
    expect(order1.start_order).toBeDefined();
  });

  it("the start_order should return an expected values ", () => {
    return order1.start_order(1).then((ress) => {
      expect(ress.status).toEqual("active");
    });
  });
});

describe("test the method current in class Order", () => {
  it("current method shoudl be found", () => {
    expect(order1.current).toBeDefined();
  });

  it("the current should return an expected values ", () => {
    return order1.current(1).then((ress) => {
      expect(ress[0].id).toEqual(2);
    });
  });
});

describe("test the method add_product_to_order in class Order", () => {
  it("add_product_to_order method shoudl be found", () => {
    expect(order1.add_product_to_order).toBeDefined();
  });

  it("the add_product_to_order should return an expected values ", () => {
    return order1
      .add_product_to_order({ order_id: 2, product_id: 1, quantity: 16 })
      .then((ress) => {
        expect(ress.quantity).toEqual(16);
      });
  });
});

describe("test the method done in class Order", () => {
  it("done method shoudl be found", () => {
    expect(order1.done).toBeDefined();
  });

  it("the done should return an expected values ", () => {
    return order1.done(2).then((ress) => {
      expect(ress.status).toEqual("completed");
    });
  });
});

describe("test the method completed in class Order", () => {
  it("completed method shoudl be found", () => {
    expect(order1.completed).toBeDefined();
  });

  it("the completed should return an expected values ", () => {
    return order1.completed(1).then((ress) => {
      expect(ress[0].id).toEqual(1);
    });
  });
});
