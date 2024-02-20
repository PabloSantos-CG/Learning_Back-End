import { User } from "../models/User";
import * as UserService from "./UserService";

describe("UserService", () => {
  let email = "test@gmail.com";
  let password = "oneTwoThree";

  beforeAll(async () => {
    await User.sync({ force: true });
  });

  it("should create a new user", async () => {
    const newUser = await UserService.createUser(email, password);
    expect(newUser).toBeInstanceOf(User);
  });

  it("should not create a new user", async () => {
    const newUser = await UserService.createUser(email, password);
    expect(newUser).toBeInstanceOf(Error);
  });

  it("should grant access", async () => {
    const permission = await UserService.access(email, password);

    expect(permission).toBeTruthy();
  });

  it("should not grant access if the email is invalid", async () => {
    const permission = await UserService.access("invalid@gmail.com", password);

    expect(permission).toBeInstanceOf(Error);
  });

  it("should not grant access if the password is invalid", async () => {
    const permission = await UserService.access(email, "invalidHash0123");

    expect(permission).toBeFalsy();
  });

  it("should return all users", async () => {
    const users = await UserService.all();
    expect(users.length).toBeGreaterThanOrEqual(1);

    for (let value of users) {
      expect(value).toBeInstanceOf(User);
    }
  });
});
