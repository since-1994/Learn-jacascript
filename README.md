# Learn-jacascript

## basics

- [for of, forEach](https://github.com/since-1994/Learn-jacascript/commit/490acb1408edca0134b7db8c1dc27eeb841559f2)
- [for in](https://github.com/since-1994/Learn-jacascript/commit/9c7d7d4eabeaf9422546ab888ff419d89d505375)
- [scope]()

## DOM

- [what is DOM](#)

<img src = "./img/img1.png" height= "400"/>

- [getElementsBy & getElementBy]()
- [querySelector & querySelectorAll](https://github.com/since-1994/Learn-jacascript/commit/9c1cc73824a471931dbc59fdd44618ce4b58a827)
- [querySelectorAll 과 getElementsBy의 차이점]()

  - querySelectorAll을 하면 NodeList를 얻고 getElementsBy를 하면 HTMLCollection을 얻는다.
  - NodeList는 중간에 item이 추가 되더라도 자동 업데이트를 하지 않는다.
  - HTMLCollection은 중간에 item이 추가되면 자동으로 업데이트를 한다.

    **그렇다면 querySelector를 지양해야 하는가? 그렇지 않다. item들을 포함하는 부모를 찾고 부모의 children을 부르면 알아서 HTMLCollection을 불러주기 때문이다.**

- [NodeList]()
  어떤 element의 element.childNodes를 하면 childNodes는 text까지 불러오기 때문에 조심해야 한다. 아래 예시를 보자

```html
<div class="parent"></div>
```

```javascript
const parent = document.querySelector(".parent");
const children = parent.childNodes; //NodeList를 반환
```

위와 같았다면 childNodes는 공백도 가져오기 때문에 주의를 해야 한다.

- [Event 종류]()

  - transitionend
    언제 쓰면 좋냐면 특정 에니매이션이 실행된 뒤에 실제 코드가 돌아가길 원할때 유용하게 사용할 수 있다.예시는 아래와 같다.

  ```javascript
  target.classList.add("fall");
  target.addEventListener("transitionend", function () {
    target.remove();
  });
  ```

  위의 코드는 떨어지는 애니메이션 뒤에 실제 삭제가 되도록 하는 코드이다.

  - DOMContentLoaded
    이 이벤트는 HTML 문서를 완전히 불러오고 분석했을 떄 실행됩니다. localStorage에서 뭐 불러오는 트리거로 사용하기 좋습니다. 아래와 같이 사용할 수 있습니다.

  ```javascript
  document.addEventListener("DOMContentLoaded", load);
  ```

- [Events](./events.js)

  - 일반적으로 addEventListener(EVENTNAME, 콜백함수)가 일반적인 구조이다.
  - 콜백함수는 argument로 event를 사용할 수 있고, event는 event에 대한 정보를 담고 있다.(클릭 좌표, 키보드 키)
  - css와 사용하면 좋다. `h1.classList.toggle()`은 클래스명이 있으면 제거하고 없으면 추가한다.

- [Event Bubbling]()
  Bubbling이라는 이름은 기포가 뽀글뽀글 올라가는거라고 생각하면 된다. 아래 코드를 보자.

```html
<ul>
  <li></li>
  <li></li>
  <li></li>
</ul>
```

```javascript
li.addEventListener("click", function1);
ul.addEventeListener("click", function2);
```

위의 상황에서 li를 클릭하면 어떻게 될까? function1과 function2가 모두 실행된다. 이것이 bubbling이다. body, html, window.. 계속 올라가게 된다. 만약 bubbling을 막고 싶다면 `event.stopPropagation()`을 해주어야 한다.

event를 통해 click event가 이루어진 자식을 구분할 수 있다. 아래와 같이 사용 가능하다.

```javascript
div.addEventListener("click", function (event) {
  console.log(event.target);
});
```

- [Session & local storage]()

  - local-storage 사용법

    - LocalStorage.setItem('key', value);
    - LocalStorage.getItem('key', value);
      value에는 string만 저장할 수 있기 때문에 array나 object를 그대로 저장하면 다시 사용할 수가 없다.

    ```javascript
    const numbers = [1, 2, 3];
    LocalStorae.setItem("numbers", JSON.stringify(numbers));
    const retrieved = JSON.parse(LocalStorage.getItem("numbers"));
    ```

    위와 같이 사용해야 한다.

    - LocalStorage.clear(); //localstorage를 모두 지운다.

  - session-storage 사용법

    - sessionStorage.setItem('key', value);

  - 두 storage의 차이점
    localStorage는 브라우저를 재시동해도 날아가지 않는다. sessionStorage는 날아간다.

## ARRAY

- HIGHER FUNCTION
  Higher function이란 다른 함수(메서드)를 parameter로 받는 것을 의미한다.

```javascript
function repeater(fn) {
  fn();
  fn();
  fn();
}
```

- CALLBACK METHOD
  Higher function에 인자로 들어가는 함수를 callback 함수라고 한다. 그니까 바로 실행되는게 아니고 특정한 호출에 의해서 실행되는 함수를 callback 함수라고 생각하면 된다.

- MAP
  MAP은 reference type을 복사하는데 사용된다. 아래 예시를 보자.

```javascript
const videos = [1, 2, 3, 4];
cosnt newVideos = videos.map(function(video){
  return video+1;
});

console.log(newVideos);//[2, 3, 4, 5]
```

만약에 return을 해주지 않더라도 map은 항상 return을 해주기 때문에 [undefined, undefined, undefined]이런식으로 된다. 이것은 완전복사라서 원래 배열에 영향을 미치지 않는다.

- FIND
  find 메서드는 조건에 맞는 첫번째 소자를 return 해줍니다.

```javascript
const videos = ["hello", "hi", "fancy video"];

const searchResult = videos.find(function (video) {
  return video.includes("fancy");
});

console.log(searchResult); //fancy video
```

- FILTER
  filter는 find와 비슷한 역할을 하지만 multiple value를 반환해줍니다.

```javascript
const videos = [1, 2, 3, 4];

const result = videos.filter(function (video) {
  return video < 3;
});

console.lod(result); // [1, 2];
```

- SOME and EVERY
  먼저 some과 every는 bool 을 반환하는 메서드다. 아래 예시를 보자.

```javascript
const numbers = [1, 2, 3, 4];

const bigger = numbers.every(function (number) {
  return number > 2;
});

console.log(bigger); //false
```

어떤 조건에 대해 어떤 value만 만족하는지 확인하려면 `some`을 사용하고 모든 value가 만족하는지 확인하려면 `every`를 사용하자.

- ARROW FUNCTION

```javascript
const games = ["minecraft", "pockemon"];

const arraowGame = games.map((game) => game + "2");

console.log(arrowGame); // ["minecraft2", "pockemon2"]
```

위에 예시처럼 arrow function에서 만약 return 값만 필요하다면 `return`을 생략하고 적을 수도 있다.

- SORT

javascript sort는 특이한게 number를 string으로 바꿔서 정렬을 한다. 아래를 보자.

```javascript
const numbers = [2, 3, 4, 1];

numbers.sort();

console.log(numbers); // [1, 2, 3, 4]

const weird = [22, 1, 3];

weird.sort();

console.log(weird); // [1, 22 ,3]
```

그래서 숫자를 정렬하려면 compare function 이 필요하다. 아래를 보자

```javascript
const weird = [22, 1, 3];

weird.sort(function (a, b) {
  return a - b; //오름 차순 compare function 내림 차순 : b-a;
});

console.log(weird); // [1, 3, 22]
```

compare function을 이용하면 object 들도 특정 property를 기준으로 정렬할 수 있다.
