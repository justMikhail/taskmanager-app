import BoardView from '../view/board.js';
import SortView from '../view/sort.js';
import TaskListView from '../view/task-list.js';
import NoTaskView from '../view/no-task.js';
import TaskView from '../view/task.js';
import TaskEditView from '../view/task-edit.js';
import LoadMoreButtonView from '../view/load-more-button.js';
import {render, RenderPosition, replace} from '../utils/render.js';

const TASK_COUNT_PER_STEP = 8;

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;

    this._boardComponent = new BoardView();
    this._sortComponent = new SortView();
    this._taskListComponent = new TaskListView();
    this._noTaskComponent = new NoTaskView();
  }

  init(boardTasks) {
    this._boardTasks = boardTasks.slice();
    render(this._boardContainer, this._boardComponent, RenderPosition.BEFORE_END);
    render(this._boardComponent, this._taskListComponent, RenderPosition.BEFORE_END);

    this._renderBoard();
  }

  _renderSort() {
    render(this._boardComponent, this._sortComponent, RenderPosition.AFTER_BEGIN);
  }

  _renderTask(task) {
    const taskComponent = new TaskView(task);
    const taskEditComponent = new TaskEditView(task);

    const replaceCardToForm = () => {
      replace(taskEditComponent, taskComponent);
    };

    const replaceFormToCard = () => {
      replace(taskComponent, taskEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    taskComponent.setEditClickHandler(() => {
      replaceCardToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    taskEditComponent.setFormSubmitHandler(() => {
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(this._taskListComponent, taskComponent, RenderPosition.BEFORE_END);
  }

  _renderTasks(from, to) {
    this._boardTasks
      .slice(from, to)
      .forEach((boardTask) => this._renderTask(boardTask));
  }

  _renderNoTasks() {
    render(this._boardComponent, this._noTaskComponent, RenderPosition.AFTER_BEGIN);
  }

  _renderLoadMoreButton() {
    // Метод, куда уйдёт логика по отрисовке кнопки допоказа задач,
    // сейчас в main.js является частью renderBoard
  }

  _renderBoard() {
    if (this._boardTasks.every((task) => task.isArchive)) {
      this._renderNoTasks();
      return;
    }

    this._renderSort();

    this._renderTasks(0, Math.min(this._boardTasks.length, TASK_COUNT_PER_STEP));

    if (this._boardTasks.length > TASK_COUNT_PER_STEP) {
      this._renderLoadMoreButton();
    }
  }
}
