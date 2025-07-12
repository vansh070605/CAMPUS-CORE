const dashboard = document.getElementById('dashboard');
const widgetControls = document.querySelectorAll('.widget-controls input[type=checkbox]');

// Available widgets
const widgets = {
  todo: {
    header: 'To-Do List',
    content: '<ul><li>Sample Task 1</li><li>Sample Task 2</li></ul>'
  },
  calendar: {
    header: 'Calendar',
    content: '<div>Upcoming Event: Math Exam (Mon)</div>'
  },
  notes: {
    header: 'Notes',
    content: '<div>Don\'t forget to review Chapter 5!</div>'
  },
  files: {
    header: 'Files',
    content: '<div><a href="#">Assignment1.pdf</a></div>'
  }
};

let widgetOrder = JSON.parse(localStorage.getItem('widgetOrder')) || ['todo', 'calendar', 'notes', 'files'];
let widgetVisibility = JSON.parse(localStorage.getItem('widgetVisibility')) || {
  todo: true, calendar: true, notes: true, files: true
};

function renderDashboard() {
  dashboard.innerHTML = '';
  widgetOrder.forEach(widgetKey => {
    if (!widgetVisibility[widgetKey]) return;
    const widget = document.createElement('div');
    widget.className = 'widget';
    widget.draggable = true;
    widget.dataset.widget = widgetKey;
    widget.innerHTML = `<div class="widget-header">${widgets[widgetKey].header}</div>${widgets[widgetKey].content}`;
    dashboard.appendChild(widget);
  });
  addDragAndDrop();
}

// Drag-and-drop functionality
function addDragAndDrop() {
  const widgetElems = dashboard.querySelectorAll('.widget');
  let dragged = null;

  widgetElems.forEach(w => {
    w.addEventListener('dragstart', function() {
      dragged = this;
      this.classList.add('dragging');
    });
    w.addEventListener('dragend', function() {
      this.classList.remove('dragging');
      dragged = null;
      localStorage.setItem('widgetOrder', JSON.stringify(widgetOrder));
    });
    w.addEventListener('dragover', function(e) {
      e.preventDefault();
      if (dragged && dragged !== this) {
        const widgetsArr = Array.from(dashboard.children);
        const from = widgetsArr.indexOf(dragged);
        const to = widgetsArr.indexOf(this);
        if (from !== to) {
          widgetOrder.splice(to, 0, widgetOrder.splice(from, 1)[0]);
          renderDashboard();
        }
      }
    });
  });
}

// Widget visibility controls
widgetControls.forEach(control => {
  control.checked = widgetVisibility[control.dataset.widget];
  control.onchange = function() {
    widgetVisibility[this.dataset.widget] = this.checked;
    localStorage.setItem('widgetVisibility', JSON.stringify(widgetVisibility));
    renderDashboard();
  };
});

renderDashboard();
