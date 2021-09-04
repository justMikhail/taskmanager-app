import SiteMenuView from './view/site-menu.js';
import FilterView from './view/filter.js';

import BoardPresenter from './presenter/board.js';

import {generateTask} from './mock/moks-task';
import {generateFilter} from './mock/mock-filter';
import {render, RenderPosition} from './utils/render';

const TASK_COUNT = 22;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = siteMainElement.querySelector('.main__control');

const boardPresenter = new BoardPresenter(siteMainElement);

render(siteHeaderElement, new SiteMenuView(), RenderPosition.BEFORE_END);
render(siteMainElement, new FilterView(filters), RenderPosition.BEFORE_END);

boardPresenter.init(tasks);
