class User{
    constructor(name, age){
        this.name = name;
        this.age = age;
    }

    get age(){
        return this.age;
    }

    set age(age){
        if(age < 0){
            this.age = 0;
            return;
        }
        this.age = age;
    }
}

const user = new User('minseok', -1);
console.log(user.age);