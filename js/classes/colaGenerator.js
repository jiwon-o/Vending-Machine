class ColaGenerator {
  constructor() {
    this.itemList = document.querySelector(".vendor .vendor-items");
  }

  async setup() {
    const response = await this.loadData();
    console.log(response);
    this.colaFactory(response);
  }

  async loadData() {
    try {
      const response = await fetch("./items.json");
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  colaFactory(data) {
    const docFrag = document.createDocumentFragment();
    data.forEach((el) => {
      const item = document.createElement("li");
      item.innerHTML = `
        <button class="btn-cola" type="button">
          <img src="images/${el.img}" alt="오리지널 콜라" />
          <h3 class="item-name">${el.name}</h3>
          <p class="item-price"><span>${el.cost}</span>원</p>
        </button>
      `;
      docFrag.append(item);
    });
    this.itemList.append(docFrag);
  }
}

export default ColaGenerator;
