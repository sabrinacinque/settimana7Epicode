class User {
    constructor(_firstName, _lastName, _age, _location){
        this.firstName = _firstName;
        this.lastName = _lastName;
        this.age = _age;
        this.location = _location;
    }

    returnAge = function(a, b) {
        if(a.age > b.age) {
            return a.firstName + ' ' + a.lastName + " è più grande di " + b.firstName + ' ' + b.lastName;
        } else if (a.age < b.age) {
            return b.firstName + ' ' + b.lastName + " è più grande di " + a.firstName + ' ' + a.lastName;
        } else {
            return a.firstName + ' ' + a.lastName + " e " + b.firstName + ' ' + b.lastName + " hanno la stessa età";
        }
    }
}

const user1 = new User("Tizio", "Esposito", 40, "Roma");
console.log("user1", user1);
const user2 = new User("Caio", "Russo", 40, "Napoli");
console.log("user2", user2);

console.log(user1.returnAge(user1, user2));