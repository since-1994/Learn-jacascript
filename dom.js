const collectionItems = document.getElementsByClassName("item");
const list = document.querySelector(".list");

console.log(list.childNodes);
// 이거는 list의 자식 중에서 element만 반환하는게 아니라 주석 , text 모두 반환한다.
// 만약 element만 반환하게 하고 싶다면 children 사용
// HTMLcollction은 forEach method 사용할 수 없음.
// NodeList는 사용 가능
console.log(list.children);