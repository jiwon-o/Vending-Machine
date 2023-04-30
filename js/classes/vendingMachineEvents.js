class VendingMachineEvents {
  constructor() {
    const vMachine = document.querySelector(".vendor");
    this.vForm = vMachine.querySelector(".form-vendor");
    this.balance = this.vForm.querySelector(".vendor-balance p");
    this.inpMoney = this.vForm.querySelector("#inpMoney");
    this.btnPut = this.vForm.querySelector(".btn-put");
    this.btnReturn = this.vForm.querySelector(".btn-return");
    this.btnGet = this.vForm.querySelector(".btn-get");

    const myInfo = document.querySelector(".my-info");
    this.myMoney = myInfo.querySelector(".my-money p");
  }

  bindEvent() {
    this.btnPut.addEventListener("click", () => {
      const inputCost = parseInt(this.inpMoney.value);
      const balanceVal = parseInt(this.balance.textContent.replaceAll(",", ""));
      const myMoneyVal = parseInt(this.myMoney.textContent.replaceAll(",", ""));

      if (inputCost % 100) {
        alert("100원 단위의 값을 입력해주세요.");
        this.inpMoney.focus();
      } else {
        if (inputCost) {
          if (myMoneyVal >= inputCost) {
            this.myMoney.textContent =
              new Intl.NumberFormat().format(myMoneyVal - inputCost) + " 원";
            this.balance.textContent =
              new Intl.NumberFormat().format(balanceVal + inputCost) + " 원";
          } else {
            alert("잔액이 부족합니다.");
          }
        }
      }
      this.inpMoney.value = "";
    });

    this.btnReturn.addEventListener("click", () => {
      const balanceVal = parseInt(this.balance.textContent.replaceAll(",", ""));
      const myMoneyVal = parseInt(this.myMoney.textContent.replaceAll(",", ""));

      if (balanceVal) {
        this.myMoney.textContent =
          new Intl.NumberFormat().format(balanceVal + myMoneyVal) + " 원";
        this.balance.textContent = "0 원";
      }
    });
  }
}

export default VendingMachineEvents;
