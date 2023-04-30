class VendingMachineEvents {
  constructor() {
    const vMachine = document.querySelector(".vendor");
    this.vForm = vMachine.querySelector(".form-vendor");
    this.balance = this.vForm.querySelector(".vendor-balance p");
    this.inpMoney = this.vForm.querySelector("#inpMoney");
    this.btnPut = this.vForm.querySelector(".btn-put");
    this.btnReturn = this.vForm.querySelector(".btn-return");
    this.btnGet = this.vForm.querySelector(".btn-get");
    this.stagedLists = this.vForm.querySelector(".get-lists");

    const myInfo = document.querySelector(".my-info");
    this.myMoney = myInfo.querySelector(".my-money p");

    const getInfo = document.querySelector(".get-info");
    this.getLists = getInfo.querySelector(".get-lists");
    this.totalPrice = getInfo.querySelector(".total-price span");
  }

  stagedItemGenerator(target) {
    const stagedItem = document.createElement("li");
    stagedItem.classList = "get-list";
    stagedItem.innerHTML = `
            <img src="images/${target.dataset.img}" alt="오리지널 콜라" />
            <span class="item-name">${target.dataset.name}</span>
            <p class="get-cnt">1</p>
          `;
    this.stagedLists.append(stagedItem);
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
            alert("소지금이 부족합니다.");
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

    this.btnsCola = document.querySelectorAll(".vendor .btn-cola");
    this.btnsCola.forEach((item) => {
      item.addEventListener("click", (e) => {
        const balanceVal = parseInt(
          this.balance.textContent.replaceAll(",", "")
        );
        const targetElPrice = parseInt(e.currentTarget.dataset.price);
        if (balanceVal >= targetElPrice) {
          this.balance.textContent =
            new Intl.NumberFormat().format(balanceVal - targetElPrice) + " 원";

          const liEl = this.stagedLists.querySelectorAll("li");
          let flag = 0;
          liEl.forEach((el) => {
            const colaName = el.querySelector(".item-name").textContent;
            if (colaName === e.currentTarget.dataset.name) {
              el.querySelector(".get-cnt").textContent++;
              flag = 1;
            }
          });
          if (!flag) {
            this.stagedItemGenerator(e.currentTarget);
          }
        } else {
          alert("잔액이 부족합니다.");
        }
      });
    });

    this.getCnt = this.getLists.querySelector(".get-cnt");
    this.btnGet.addEventListener("click", () => {
      const totalVal = parseInt(
        this.totalPrice.textContent.replaceAll(",", "")
      );
      const stagedList = this.stagedLists.querySelectorAll("li");
      const getList = this.getLists.querySelectorAll("li");
      let sum = 0;
      stagedList.forEach((sItem) => {
        let flag = 0;
        getList.forEach((gItem) => {
          const stagedCnt = parseInt(
            sItem.querySelector(".get-cnt").textContent
          );
          const getCnt = parseInt(gItem.querySelector(".get-cnt").textContent);
          if (
            sItem.querySelector(".item-name").textContent ===
            gItem.querySelector(".item-name").textContent
          ) {
            gItem.querySelector(".get-cnt").textContent = getCnt + stagedCnt;
            this.stagedLists.innerHTML = "";
            flag = 1;
          }
        });
        if (!flag) {
          this.getLists.append(sItem);
        }

        this.btnsCola.forEach((cola) => {
          if (
            sItem.querySelector(".item-name").textContent === cola.dataset.name
          ) {
            sum += parseInt(
              cola.dataset.price * sItem.querySelector(".get-cnt").textContent
            );
          }
        });
      });
      this.totalPrice.textContent = totalVal + sum;
    });
  }
}

export default VendingMachineEvents;
