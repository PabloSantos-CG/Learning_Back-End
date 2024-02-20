const Wallet = require("./Wallet");

describe("wallet", () => {
  it("should create an empty wallet with 0 balance", () => {
    const wallet = new Wallet();

    expect(wallet.balance).toBe(0);
  });

  it("should create an empty wallet with no transactions", () => {
    const wallet = new Wallet();

    expect(wallet.transactions).toEqual([]);
  });

  it("should save a transaction on a wallet", () => {
    const wallet = new Wallet();
    const mockTransaction = "transaction";

    wallet.addTransaction(mockTransaction);
    expect(wallet.transactions).toContain(mockTransaction);
  });

  it("should update wallet balance when transaction is saved", () => {
    const wallet = new Wallet();
    const mockTransaction = { value: 22 };

    wallet.addTransaction(mockTransaction);
    expect(wallet.balance).toEqual(mockTransaction.value);
  });

  it("should get wallet balance as a number of up to two decimal places", () => {
    const wallet = new Wallet();
    const mockTransaction = { value: 2222 };

    wallet.addTransaction(mockTransaction);
    expect(wallet.getBalance()).toBe(22.22);
  });
});
