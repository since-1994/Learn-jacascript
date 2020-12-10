const headers = document.getElementsByTagName("h2");
const list = document.getElementsByClassName("list");
const button = document.getElementById("button");
// 이거만 Elements 가 아니라 Element인 것을 볼 수 있다. 제일 처음 찾은 것만 return 한다.

const item1 = document.querySelector(".item");
// 이거는 getElement와 동일하게 제일 처음 elemnt만 return 한다.
const items = document.querySelectorAll(".item");

const h1 = document.querySelector("h2.item");


console.log(headers);