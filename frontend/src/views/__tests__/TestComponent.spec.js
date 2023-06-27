// В этих тестах мы проверяем, что элемент правильно отрисован и реагирует на действия пользователя.

import { mount } from "@vue/test-utils";
import "@/stores/__tests__/mockServices";
import { describe, beforeEach, it, expect, vi } from "vitest";
import TestComponent from "../TestComponent.vue";
import { createTestingPinia } from "@pinia/testing";
import { useColumnsStore, useTasksStore, useUsersStore } from "@/stores";
import router from "@/router";

describe("TestComponent", () => {
  let wrapper, usersStore, tasksStore, columnsStore;
  beforeEach(async () => {
    // Создаём экземпляр Pinia
    const pinia = createTestingPinia({
      createSpy: vi.fn,
      stubActions: false,
    });
    // Создаём экземпляр компонента
    wrapper = mount(TestComponent, {
      global: {
        plugins: [pinia, router], // добавляем Pinia и vue-router к компоненту
      },
    });
    // Создаём экземпляры хранилищ
    usersStore = useUsersStore();
    tasksStore = useTasksStore();
    columnsStore = useColumnsStore();
    // Делаем изначальные запросы для заполнения хранилищ
    await usersStore.fetchUsers();
    await tasksStore.fetchTasks();
    await columnsStore.fetchColumns();
  });

  it("should render", async () => {
    expect(wrapper.exists).toBeTruthy();
  });

  it("should have a proper title", () => {
    const deskTitle = wrapper.find('[data-test="desk-title"]');
    expect(deskTitle.text()).toBe("Design Coffee Lab");
  });

  it("should render add column button", () => {
    const addColumnButton = wrapper.find('[data-test="desk-add"]');
    expect(addColumnButton.text()).toBe("Добавить столбец");
  });

  it("should trigger addColumn action", async () => {
    const addColumnButton = wrapper.find('[data-test="desk-add"]');
    addColumnButton.trigger("click");
    expect(columnsStore.addColumn).toHaveBeenCalledTimes(1);
  });

  it("should have user filter", () => {
    const users = wrapper.findAll('[data-test="user-filter"]');
    expect(users.length).toBe(8);
  });
});
