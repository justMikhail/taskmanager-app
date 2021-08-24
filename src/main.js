import {renderTemplate} from './utils/utils.js';

import {generateTask} from './mock/moks-task.js';
import {generateFilter} from './mock/mock-filter';

import {createSiteMenuTemplate} from './view/site-menu.js';
import {createFilterTemplate} from './view/filter.js';
import {createTaskTemplate} from './view/task.js';
import {createTaskEditTemplate} from './view/task-edit.js';
import {createLoadMoreButtonTemplate} from './view/load-more-button.js';
import {createBoardTemplate} from './view/board.js';

const TASK_COUNT = 22;
const TASK_COUNT_PER_STEP = 8;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);
console.log(filters)

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = siteMainElement.querySelector('.main__control');

renderTemplate(siteHeaderElement, createSiteMenuTemplate(), 'beforeEnd');
renderTemplate(siteMainElement, createFilterTemplate(filters), 'beforeEnd');
renderTemplate(siteMainElement, createBoardTemplate(), 'beforeEnd');

const boardElement = siteMainElement.querySelector('.board');
const taskListElement = boardElement.querySelector('.board__tasks');

renderTemplate(taskListElement, createTaskEditTemplate(tasks[0]), 'beforeEnd');

for (let i = 1; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
  renderTemplate(taskListElement, createTaskTemplate(tasks[i]), 'beforeEnd');
}

if (tasks.length > TASK_COUNT_PER_STEP) {

  let renderedTaskCount = TASK_COUNT_PER_STEP;

  renderTemplate(boardElement, createLoadMoreButtonTemplate(), 'beforeEnd');

  const loadMoreButton = boardElement.querySelector('.load-more');

  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    console.log('Works!');

    tasks
      .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((task) => renderTemplate(taskListElement, createTaskTemplate(task), 'beforeEnd'));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
}
