<template>
  <div
    ref="dialog"
    class="task-card"
    tabindex="0"
    @click.self="closeDialog"
    @keydown.esc="closeDialog"
  >
    <section class="task-card__wrapper">
      <!--Закрытие задачи-->
      <button class="task-card__close" type="button" @click="closeDialog" />

      <!--Шапка задачи-->
      <div class="task-card__block">
        <div class="task-card__row">
          <!--Наименование задачи-->

          <!--Кнопка редактирования задачи-->
        </div>
        <!--Дата создания задачи-->
      </div>
      <!--Участник задачи и срок выполнения-->
      <div class="task-card__block">
        <ul class="task-card__params">
          <!--Участник задачи-->

          <!--Срок выполнения-->
        </ul>
      </div>
      <!--Описание задачи-->

      <!--Дополнительная ссылка-->

      <!--Чек-лист-->

      <!--Метки-->

      <!--Комментарии-->
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const dialog = ref(null);

onMounted(() => {
  // Фокусируемся на диалоговом окне, чтобы сработала клавиша Esc без дополнительного клика на окне
  dialog.value.focus();
});

const router = useRouter();
const route = useRoute();

const closeDialog = function () {
  router.push("/");
};
</script>
