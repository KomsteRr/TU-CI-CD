import { describe, it, expect, vi } from "vitest";
import { User, Item, ToDoList, EmailSenderService } from "./index.js";

describe("ToDoList Project", () => {
  const validUser = new User("test@test.com", "test1", "test2", "Test1234", 20);

  it("should validate a valid user", () => {
    expect(validUser.isValid()).toBe(true);
  });

  it("should throw error for invalid user", () => {
    const invalidUser = new User("invalid", "test1", "test2", "1234", 12);
    expect(() => new ToDoList(invalidUser)).toThrow("Invalid user");
  });

  it("should add item to the ToDoList", () => {
    const todoList = new ToDoList(validUser);
    const item = new Item("test_tache1", "test tache");
    todoList.addItem(item);
    expect(todoList.items.length).toBe(1);
  });

  it("should not add duplicate items", () => {
    const todoList = new ToDoList(validUser);
    todoList.addItem(new Item("test_tache1", "tache 1"));
    expect(() =>
      todoList.addItem(new Item("test_tache1", "tache dup"))
    ).toThrow("Item name must be unique");
  });

  it("should not add items within 30 minutes of the last item", () => {
    const todoList = new ToDoList(validUser);
    todoList.addItem(new Item("test_tache1", "tache 1"));
    expect(() =>
      todoList.addItem(new Item("test_tache2", "tache 2"))
    ).toThrow("Cannot add item now or list is full");
  });

  it("should send email on 8th item", () => {
  const todoList = new ToDoList(validUser);
  vi.spyOn(EmailSenderService, "sendEmail");
  for (let i = 1; i <= 7; i++) {
    todoList.addItem(new Item(`Task${i}`, `Content for task ${i}`));
    todoList.lastItemCreation = new Date(Date.now() - 31 * 60 * 1000);
  }
  todoList.addItem(new Item("test_tache_8", "soon plein"));
  expect(EmailSenderService.sendEmail).toHaveBeenCalledWith(
    validUser.email,
    "ToDoList almost full!"
  );
});

  it("should throw error on save method", () => {
    const todoList = new ToDoList(validUser);
    expect(() => todoList.save()).toThrow("Save method not implemented");
  });
});