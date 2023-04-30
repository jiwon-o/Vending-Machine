import ColaGenerator from "./classes/colaGenerator.js";
import VendingMachineEvents from "./classes/vendingMachineEvents.js";

const colaGenerator = new ColaGenerator();
const vendingMachineEvents = new VendingMachineEvents();

colaGenerator.setup();
vendingMachineEvents.bindEvent();

// 밴딩머신

// - active 없애기 ⇒ 수량있을 시 계속 추가되기
// - 현재 수량 표시하는 거 각 버튼에 추가
// - 입금액 100의 배수로 처리하기
// - 현재 장바구니 아이템 삭제 ⇒ hover하면 삭제 버튼 ⇒ 확인 alert  뜨기
// - 현재 장바구니 아이템 수량 조절
//     - 숫자 박스 눌렀을 시 수량 조절 가능한 팝업
//     - 숫자 테두리 없애고 수량 조절 버튼 넣기
