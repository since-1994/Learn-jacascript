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
  find 메서드는 조건에 맞는 첫번째 소자를 return 해준다.

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

- COPY with ...(SPREAD)

spread를 이용하면 배열을 간단하게 복사할 수 있습니다.

```javascript
const ratings = [1, 2, 3, 4];

const copied = [...ratings];

copied[0] = 0;

console.log(ratings); ///[1, 2, 3, 4]

/////////////////////////////////////////////////////////////////

const name = "minseok;

const name_array = [...name];

console.log(name_array); // ['m', 'i', 'n', 's', 'e', 'o', 'k']
```

위와 같이 간단하게 복사할 수도 있고 문자열을 간단히 배열로 만들수도 있습니다. 또한 여러 배열을 합치는데도 사용할 수 있습니다.

```javascript
const numbers = [1, 2];
const otherNumbers = [3, 4];

const allNumbers = [...numbers, ...otherNumbers, 5, 6];

console.log(allNumbers); // [1, 2, 3, 4, 5, 6]
```

## OBJECT

- GLOBAL EXECUTION CONTEXT

빈 파일을 실행시키더라도 자동적으로 `global execution context`이 생성됩니다. `global execution context`은 두개의 페이즈로 나뉜다고 할 수 있고 실행 직후가 creation phase 라고 합시다. creation phase에서는 global object와 코드에 작성된 함수를 미리 메모리에 할당시킵니다. 아래 예시를 통해 알 수 있습니다. creation phase에서는 global object 정의, 메모리 할당, scope chain등이 일어납니다. (scope chain 이란 ? 어느 변수가 어느 scope에서 유효한지를 확인하는 것)

```javascript
sayHi(); // hello
sayBi(); // 에러

function sayHi() {
  console.log("hello");
}

cosnt sayBi = function(){
  console.log('bye');
}
```

함수가 선언되기 전에 함수를 호출 했음에도 에러가 발생하지 않는 것은 creation phase에서 이미 메모리에 할당 되어있기 때문입니다. 이런 것을 `Hoisting`이라고 부릅니다. function이 아닌 경우에는 메모리에 할당되더라도 초기화는 되지 않으므로 위와 같은 상황에선 에러가 발생합니다.

- CALLSTACK

callstack은 execution phase에서 나타나는 것으로 아래 코드를 보면서 얘기해보자

```javascript
function sayHi() {
  sayHello();
  console.log("hi");
}

function sayHello() {
  console.log("hello");
}

sayHi();
```

위와 같은 코드가 있다면 가장 먼저 global execution context가 stack에 들어가고 그 위로 sayHi execution context가 올라가고 그리고 sayHello execution context가 올라간다. sayHello가 종료되면 stack에서 빠지고 맨 위는 sayHi execution context가 된다. console.log('hi')가 실행되고 sayHi도 종료된다. 그리고 stack에서 빠지게 된다. 그러면 global execution context만 남게 된다. 중간에 있던게 빠지거나 이런일은 절대 없다. 이런 것이 callstack이라고 불리고 javascript engine이 코드를 실행시키는 방법이다.

- THIS

keyword `this`는 가리키는 object에 따라 달라진다. 아래를 보자

```javascript
console.log(this); // window

const user = {
  name: "minseok",
  sayHi: function () {
    console.log(this);
  },
};

user.sayHi(); //Object user{}
```

이렇게 가리키는 object에 따라 this가 바뀌는 것을 볼 수 있다. 아래와 같이 이용하면 좋다.

```javascript
const user1 = {
  name: "minseok",
  greeting: sayHi,
};

const user2 = {
  name: "heatchou",
  greeting: sayHi,
};

function sayHi() {
  console.log(this.name);
}

user1.greeting(); // minseok
user2.greeting(); // heatchou
```

위와 같이 사용하면 같은 함수더라도 다른 결과를 내도록 사용할 수 있다.

- this의 주의사항

```javascript
const user = {
  name: "minseok",
  greet() {
    function sayHi() {
      console.log(this.name);
    }
    sayHi();
  },
};

user.greet(); // 에러 발생 !!
```

위 처럼 object 메서드 안에서 또 함수를 정의하게 되면 새로운 execution이 생성되기 때문에 this가 user를 가리키지 않게 된다. 직접해보니까 에러가 발생하진 않고 아무 출력도 일어나지 않는다. 그래서 보통 사용하고자 하면 아래와 같이 사용한다. 참고로 함수를 정의 하지 않았더라도 다른 함수를 실행하게 되면 위와 동일하게 this가 의도와는 다른것을 가리키게 된다.

```javascript
const user = {
  name: "minseok",
  hello: () => {
    console.log(this); // Window
  },
  greet() {
    const sayHi = () => {
      console.log(this.name);
    };
    sayHi();
  },
};

user.hello();
user.greet(); //minseok
```

위에 처럼 되는 이유는 arrow function은 새로운 키워드를 만들지 않기 때문이다. 솔직히 좀 헷갈린다..

- BIND, CALL, APPLY
  함수라는 것도 자바스크립트에서 결국 object이기 때문에 메서드를 가질 수 있다.

  - BIND
    bind는 특정 object를 가지고 갈 수 있게 해준다. 아래와 같이 사용 가능

    ```javascript
    const user = {
      name: "minseok",
    };

    function getName(greet) {
      console.log(greet);
      console.log(this.name);
    }

    const register = getName.bind(user);
    register("Hello");
    ```

  - CALL
    call은 특정 object를 가지고 갈 수 있게 해주는 동시에 parameter도 받아서 실행시킨다. 아래 예시를 보자.

    ```javascript
    const user = {
      name: "minseok",
    };

    function getName(greet) {
      console.log(greet);
      console.log(this.name);
    }

    getName.call(user, "hello");
    ```

  - APPLY
    apply는 특정 object를 가지고 갈 수 있게 해주는 동시에 parameter도 받아서(배열로 받는다.) 실행시킨다. 아래 예시를 보자.

    ```javascript
    const user = {
      name: "minseok",
    };

    function getName(greet, age) {
      console.log(greet);
      console.log(this.name);
    }

    getName.apply(user, ["hello", 27]);
    ```

- CONSTRUCTOR FUNCTION
  Constructor function은 보통 대문자로 시작하는데요 문법은 아니지만 보통 그렇게 약속하고 사용합니다. constructor function을 사용하면 object를 쉽게 생성할 수 있습니다. 키워드 new와 함께 사용합니다.

```javascript
function Todo(name, completed) {
  this.name = name;
  this.completed = completed;
  this.getName = function () {
    console.log(this.name);
  };
}

const todo1 = new Todo("go gym", false);
const todo2 = new Todo("study", true);

console.log(todo1); // Object{}
todo1.getName(); // go gym
```

그런데 여기서 문제가 constructor function에서 함수를 정의하면 object를 생성할때마다 각각의 메서드가 생성되고 많은 메모리를 잡아먹습니다.
그럼 어떻게 하는게 좋을까요?

- PROTOTYPE

prototype이라고 하는건 constructor function으로 생성되는 object들이 공통적으로 갖는 것을 의미합니다. 똑같은걸 여러개 만들필요는 없으니까요. constructor function의 코드를 아래와 같이 바꿀 수 있습니다.

```javascript
function Todo(name, completed) {
  this.name = name;
  this.completed = completed;
}

Todo.prototype.getName = function () {
  console.log(this.name);
};

const todo1 = new Todo("go gym", false);
const todo2 = new Todo("study", true);

console.log(todo1); // Object{}
todo1.getName(); // go gym
```

prototype은 어디에 사용되고 있을까요.

```javascript
const arr = [1, 2, 3, 4];
arr.push(5);

const anotherArr = new Array(1, 2, 3, 4, 5);
anotherArr.push(6);
```

Array도 결국 object이고 push와 같은 메서드는 바로 prototype의 메서드를 inherit한거죠.

- PROTOTYPAL INHERITANCE

```javascript
function User(name, age) {
  this.name = name;
  this.age = age;
}

User.prototype.getName = function () {
  console.log(this.name);
};

function PremiumUser(name, age, payment) {
  User.call(this, name, age);
  this.payment = payment;
}

PreminumUser.prototype = Object.create(User.prototype);

const user1 = new PreminumUser("minseok", 27, true);
user1.getName();
```

User라는 constructor function을 정의하고 이 함수를 inherit 하고 싶다면 `User.call(this);`를 해주면 된다. 만약에 prototype도 inherit하고 싶다면 `PreminumUser.prototype = Object.create(User.prototype);`이라고 하면 된다.

- CLASS

constructor function과 prototype을 같이 이용한다면 사실 번거롭습니다. 그래서 class를 알아봅시다.

```javascript
class User{
  constructor(name, age){
    this.name = name;
    this.age = age;
  }

  getInfo(){
    console.log(this.name, this.age);
  }
}

const user1 = new User("minseok". 27);
user1.getInfo();// minseok 27
```

class를 이용하면 prototype을 사용하지 않아도 자동으로 prototype으로 해줍니다. 상속하고 싶다면 어떻게 할까요?

```javascript
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getInfo() {
    console.log(this.name, this.age);
  }
}

class PreminumUser extends User {
  constuctor(name, age, payment) {
    super(name, age);
    this.payment = payment;
  }
}

const user1 = new PremiumUser("minseok", 27, true);
user1.getInfo(); // minseok 27
```

`extends User`를 해주고 constructor에서 `super(name, age)`를 해주면 메소드를 포함한 모든 property를 상속합니다.
