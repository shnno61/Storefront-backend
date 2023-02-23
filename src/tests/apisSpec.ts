import supertest from "supertest";
import app from "../server";
const request = supertest(app);
const jwt = require("jsonwebtoken");
import config from "../config";
const data = {
  first_name: "shn0",
  last_name: "shn0",
  passs: "shn0",
};
console.log(config.env);
const token = jwt.sign({ user: data }, config.jwtSecret); // use this token to veryfiyauth
describe("Users handlers: ", () => {
  it("(/store/users) => create should return a user and status code to be 200 when valid input", async () => {
    const data = {
      first_name: "shn0",
      last_name: "shn0",
      passs: "shn0",
    };
    const data2 = {
      first_name: "shn00",
      last_name: "shn00",
      passs: "shn00",
    };
    const res = await request.post("/store/users/").send(data);
    await request.post("/store/users/").send(data2);
    expect(res.status).toBe(200);
    expect(res.body.data.first_name).toBe("shn0");
  });

  it("(/store/users) => create should return status code to be 400 when invalid input", async () => {
    const data = {
      first_name: "shn0",
      last_name: "shn0",
      passs: "shn0",
    };
    const res = await request.post("/store/users/").send(data);

    expect(res.status).toBe(400);
  });

  it("(/store/users/:id) => show should return a user and status code to be 200 when valid input", async () => {
    const res = await request.get("/store/users/1").set("authorization", token);

    expect(res.status).toBe(200);
    expect(res.body.data.first_name).toBe("shn0");
  });

  it("(/store/users/:id) => show should return status code to be 400 when invalid input", async () => {
    const res = await request.get("/store/users/7").set("authorization", token);

    expect(res.status).toBe(404);
  });

  it("(/store/users/update/:id) => update should return a user and status code to be 200 when valid input", async () => {
    const data = {
      first_name: "shn5",
      last_name: "shn5",
      passs: "shn5",
    };
    const res = await request
      .put("/store/users/update/1")
      .send(data)
      .set("Authorization", token);

    expect(res.status).toBe(200);
    expect(res.body.data.first_name).toBe("shn5");
  });

  it("(/store/users/update/:id) => update should return status code to be 400 when invalid input", async () => {
    const data = {
      first_name: "shn5",
      last_name: "shn5",
      passs: "shn5",
    };
    const res = await request
      .put("/store/users/update/9")
      .send(data)
      .set("authorization", token);

    expect(res.status).toBe(400);
  });

  it("(/store/users/) => index should return status code to be 200  ", async () => {
    const res = await request.get("/store/users/").set("authorization", token);

    expect(res.status).toBe(200);
  });

  it("(/store/users/delete/:id) => delete should return status code to be 200 when valid input  ", async () => {
    const res = await request
      .delete("/store/users/delete/2")
      .set("authorization", token);

    expect(res.status).toBe(200);
  });

  it("(/store/users/delete/:id) => delete should return status code to be 404 when invalid input  ", async () => {
    const res = await request
      .delete("/store/users/delete/9")
      .set("authorization", token);

    expect(res.status).toBe(404);
  });
});

describe("Products handlers: ", () => {
  it("(/store/products) => create should return a user and status code to be 200 when valid input", async () => {
    const data = { name: "apple", price: 10, category: "fakha" };
    const data2 = { name: "yousfi", price: 15, category: "fakha" };
    const res = await request
      .post("/store/products/")
      .send(data)
      .set("Authorization", token);
    await request
      .post("/store/products/")
      .send(data2)
      .set("Authorization", token);

    expect(res.status).toBe(200);
    expect(res.body.informations.name).toBe("apple");
  });

  it("(/store/products) => create should return status code to be 400 when invalid input", async () => {
    const data = { name: "apple", price: 10, category: "fakha" };
    const res = await request
      .post("/store/products/")
      .send(data)
      .set("Authorization", token);

    expect(res.status).toBe(400);
  });

  it("(/store/products/:id) => show should return a user and status code to be 200 when valid input", async () => {
    const res = await request
      .get("/store/products/1")
      .set("authorization", token);

    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe("apple");
  });

  it("(/store/users/:id) => show should return status code to be 400 when invalid input", async () => {
    const res = await request
      .get("/store/products/7")
      .set("authorization", token);

    expect(res.status).toBe(404);
  });

  it("(/store/products/update/:id) => update should return a user and status code to be 200 when valid input", async () => {
    const data = { name: "yousfi2", price: 20, category: "fakha" };
    const res = await request
      .put("/store/products/update/1")
      .send(data)
      .set("Authorization", token);

    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe("yousfi2");
  });

  it("(/store/products/update/:id) => update should return status code to be 400 when invalid input", async () => {
    const data = { name: "yousfi2", price: 5, category: "fakha" };
    const res = await request
      .put("/store/products/update/9")
      .send(data)
      .set("authorization", token);

    expect(res.status).toBe(400);
  });

  it("(/store/users/) => index should return status code to be 200  ", async () => {
    const res = await request.get("/store/users/").set("authorization", token);

    expect(res.status).toBe(200);
  });

  it("(/store/products/delete/:id) => delete should return status code to be 200 when valid input  ", async () => {
    const res = await request
      .delete("/store/products/delete/2")
      .set("authorization", token);

    expect(res.status).toBe(200);
  });

  it("(/store/products/delete/:id) => delete should return status code to be 404 when invalid input  ", async () => {
    const res = await request
      .delete("/store/products/delete/9")
      .set("authorization", token);

    expect(res.status).toBe(404);
  });

  it("(/store/products/top/5) => top should return status code to be 200 when valid input  ", async () => {
    const res = await request.get("/store/products/top/5");

    expect(res.body.informations[0].name).toBe("yousfi2");
  });

  it("(/store/products/categoru?catefory=q) => category should return status code to be 404 when invalid input  ", async () => {
    const res = await request.get("/store/products/in/category?category=fakha");

    expect(res.body.informations[0].name).toBe("yousfi2");
  });
});

describe("Orders handlers: ", () => {
  it("(/store/orders/users/:id<user_id>) =>start order and status code to be 200  and id of order  ", async () => {
    const res = await request
      .put("/store/orders/users/1")
      .set("Authorization", token);
    expect(res.status).toBe(200);
    expect(res.body.informations.id).toBe(1);
  });

  it("(/store/orders) => add_product_to_order should return  specific values", async () => {
    const data = { order_id: 1, product_id: 1, quantity: 10 };
    const res = await request
      .post("/store/orders")
      .send(data)
      .set("Authorization", token);
    expect(res.body.informations.quantity).toBe(10);
  });

  it("(/store/orders/:id<order_id>) => show order details should return  specific values", async () => {
    const res = await request
      .get("/store/orders/1")
      .set("Authorization", token);
    expect(res.body.informations[0].product_name).toBe("yousfi2");
  });

  it("(/store/orders/:id<user_id>/active) => current should return  specific values", async () => {
    const res = await request
      .get("/store/orders/1/active")
      .set("Authorization", token);
    expect(res.body.informations[0].id).toBe(1);
  });

  it("(/store/orders/:id<order_id> ) => index should return  specific values", async () => {
    const res = await request.get("/store/orders/").set("Authorization", token);
    expect(res.body.informations[0].id).toBe(1);
  });

  it("(/store/orders/:id<order_id>  ) => done should return status code 200", async () => {
    const res = await request
      .put("/store/orders/1")
      .set("Authorization", token);
    expect(res.status).toBe(200);
  });

  it("(store/orders/:id<user_id>/completed) => completed should return  specific values", async () => {
    const res = await request
      .get("/store/orders/1/completed")
      .set("Authorization", token);
    expect(res.body.informations[0].status).toBe("completed");
  });

  it("(/store/orders/:id<order_id>  ) => remove should return status code 200", async () => {
    const data = { product_id: 1 };
    const res = await request
      .delete("/store/orders/1")
      .send(data)
      .set("Authorization", token);
    expect(res.body.data.product_id).toBe(1);
  });
});

describe("veryfiyauth  middleware: ", () => {
  it("(store/orders/:id<user_id>/completed) =>  should return status code 401 when no token is provided ", async () => {
    const res = await request.get("/store/orders/1/completed");
    expect(res.status).toBe(401);
  });
});
