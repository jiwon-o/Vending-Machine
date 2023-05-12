class ColaGenerator {
  constructor() {
    this.itemList = document.querySelector(".vendor .vendor-items");
  }

  async setup() {
    const response = await this.loadData();
    this.colaFactory(response);
  }

  async loadData() {
    try {
      const response = await fetch("./items.json");

      // 서버의 응답 코드가 200 ~ 299 일 경우
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
        <button class="btn-cola" type="button" data-name="${el.name}", data-price="${el.cost}", data-img="${el.img}", data-count="${el.count}">
          <img src="images/${el.img}" alt="오리지널 콜라" />
          <span class="item-name">${el.name}</span>
          <p class="item-price">${el.cost}원</p>
        </button>
        
      `;
      docFrag.append(item);
    });
    this.itemList.append(docFrag);
  }
}

export default ColaGenerator; // export할게 하나밖에 없을때 default
