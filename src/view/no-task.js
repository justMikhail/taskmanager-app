import AbstractView from './abstract';

const createNoTaskTemplate = () => (
  `<p class="board__no-tasks">
    Click «ADD NEW TASK» in menu to create your first task
  </p>`
);

export default class NoTask extends AbstractView {

  getTemplate() {
    return createNoTaskTemplate();
  }
}
