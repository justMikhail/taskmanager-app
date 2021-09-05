import AbstractView from './abstract';
import {SortType} from '../const/const';

const createSortTemplate = () => (
  `<div class="board__sort-list">
    <a href="#" class="board__sort-item" data-sort-type="${SortType.DEFAULT}">SORT BY DEFAULT</a>
    <a href="#" class="board__sort-item" data-sort-type="${SortType.DATE_UP}">SORT BY DATE up</a>
    <a href="#" class="board__sort-item" data-sort-type="${SortType.DATE_DOWN}">SORT BY DATE down</a>
  </div>`
);

export default class Sort extends AbstractView {

  getTemplate() {
    return createSortTemplate();
  }
}
