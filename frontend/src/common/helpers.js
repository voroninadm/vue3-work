import { DAY_IN_MILLISEC, TAG_SEPARATOR } from "./constants";
import timeStatuses from "./enums/timeStatuses";
import taskStatuses from "./enums/taskStatuses";

/**
 * принимает строку с метками и разделять её на массив по определённому идентификатору
 * @param {*} tags
 * @returns
 */
export const getTagsArrayFromString = (tags) => {
  const array = tags.split(TAG_SEPARATOR);
  return array.slice(1, array.length);
};

/**
 * принимает срок выполнения задачи (дедлайн), сравнивает его с текущим временем и возвращает статус задачи по времени.
 * @param {*} dueDate
 * @returns
 */
export const getTimeStatus = (dueDate) => {
  if (!dueDate) {
    return "";
  }
  const currentTime = +new Date();
  const taskTime = Date.parse(dueDate);
  const timeDelta = taskTime - currentTime;
  if (timeDelta > DAY_IN_MILLISEC) {
    return "";
  }
  return timeDelta < 0 ? timeStatuses.DEADLINE : timeStatuses.EXPIRED;
};

/**
 * для нормализации задач, которые приходят с сервера.
 * @param {*} task
 * @returns
 */
export const normalizeTask = (task) => {
  return {
    ...task,
    status: task.statusId ? taskStatuses[task.statusId] : "",
    timeStatus: getTimeStatus(task.dueDate),
  };
};
