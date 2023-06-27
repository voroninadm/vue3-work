<template>
  <main class="content">
    <section class="desk">
      <!--      Отображение дочерних маршрутов-->
      <router-view />
      <!--      Шапка доски-->
      <div class="desk__header">
        <h1 class="desk__title" data-test="desk-title">Design Coffee Lab</h1>
        <!--        Добавили кнопку для добавления новой колонки-->
        <button
          class="desk__add"
          type="button"
          data-test="desk-add"
          @click="columnsStore.addColumn"
        >
          Добавить столбец
        </button>

        <div class="desk__filters">
          <div class="desk__user-filter">
            <!--            Список пользователей-->
            <ul class="user-filter">
              <li
                v-for="user in usersStore.users"
                :key="user.id"
                :title="user.name"
                data-test="user-filter"
                class="user-filter__item"
                :class="{
                  active: filtersStore.filters.users.some(
                    (id) => id === user.id
                  ),
                }"
                @click="
                  filtersStore.applyFilters({ item: user.id, entity: 'users' })
                "
              >
                <a class="user-filter__button">
                  <img
                    :src="getPublicImage(user.avatar)"
                    alt="Аватар юзера"
                    width="24"
                    height="24"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { useUsersStore, useColumnsStore, useFiltersStore } from "@/stores";
import { getPublicImage } from "../common/helpers";

// Определяем хранилища
const usersStore = useUsersStore();
const columnsStore = useColumnsStore();
const filtersStore = useFiltersStore();
</script>
