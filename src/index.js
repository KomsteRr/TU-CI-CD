class User {
  constructor(email, firstname, lastname, password, age) {
    this.email = email;
    this.firstname = firstname;
    this.lastname = lastname;
    this.password = password;
    this.age = age;
  }

  isValid() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,40}$/;

    return (
      emailRegex.test(this.email) &&
      this.firstname &&
      this.lastname &&
      passwordRegex.test(this.password) &&
      this.age >= 13
    );
  }
}

class Item {
  constructor(name, content) {
    this.name = name;
    this.content = content;
    this.createdAt = new Date();
    if (content.length > 1000) {
      throw new Error("Content exceeds 1000 characters");
    }
  }
}

class ToDoList {
  constructor(user) {
    if (!user.isValid()) {
      throw new Error("Invalid user");
    }
    this.user = user;
    this.items = [];
    this.lastItemCreation = null;
  }

  canAddItem() {
    if (this.lastItemCreation && ((new Date() - this.lastItemCreation) / (1000 * 60)) < 30) {
      return false;
    }
    return this.items.length < 10;
  }

  addItem(item) {
    if (this.items.some((i) => i.name === item.name)) {
      throw new Error("Item name must be unique");
    }
    if (!this.canAddItem()) {
      throw new Error("Cannot add item now or list is full");
    }
    this.items.push(item);
    this.lastItemCreation = new Date();

    if (this.items.length === 8) {
      EmailSenderService.sendEmail(this.user.email, "ToDoList almost full!");
    }
  }

  save() {
    throw new Error("Save method not implemented");
  }
}

class EmailSenderService {
  static sendEmail(email, message) {
    console.log(`Email sent to ${email}: ${message}`);
  }
}

module.exports = { User, Item, ToDoList, EmailSenderService };