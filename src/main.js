import {generateTask} from './mock/moks-task.js';

import {createSiteMenuTemplate} from './view/site-menu.js';
import {createFilterTemplate} from './view/filter.js';
import {createTaskTemplate} from './view/task.js';
import {createTaskEditTemplate} from './view/task-edit.js';
import {createLoadMoreButtonTemplate} from './view/load-more-button.js';
import {createBoardTemplate} from './view/board.js';

const TASK_COUNT = 4;
const tasks = new Array(TASK_COUNT).fill().map(generateTask);

console.log(tasks)

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = siteMainElement.querySelector('.main__control');

render(siteHeaderElement, createSiteMenuTemplate(), 'beforeEnd');
render(siteMainElement, createFilterTemplate(), 'beforeEnd');
render(siteMainElement, createBoardTemplate(), 'beforeEnd');

const boardElement = siteMainElement.querySelector('.board');
const taskListElement = boardElement.querySelector('.board__tasks');

render(taskListElement, createTaskEditTemplate(tasks[0]), 'beforeEnd');

for (let i = 1; i < TASK_COUNT; i++) {
  render(taskListElement, createTaskTemplate(tasks[i]), 'beforeEnd');
}

render(boardElement, createLoadMoreButtonTemplate(), 'beforeEnd');
