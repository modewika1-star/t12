let tasks = [
  { id: 1,  name: 'Gym',     desc: 'Play cardio',           status: 'completed' },
  { id: 2,  name: 'Cinema',  desc: 'Watch movie',           status: 'waiting'   },
  { id: 3,  name: 'Study',   desc: 'Do math homework',      status: 'completed' },
  { id: 4,  name: 'Grocery', desc: 'Buy vegetables',        status: 'waiting'   },
  { id: 5,  name: 'Doctor',  desc: 'Annual checkup',        status: 'completed' },
  { id: 6,  name: 'Reading', desc: 'Finish the novel',      status: 'waiting'   },
  { id: 7,  name: 'Meeting', desc: 'Project sync call',     status: 'completed' },
  { id: 8,  name: 'Laundry', desc: 'Wash and iron clothes', status: 'waiting'   },
  { id: 9,  name: 'Coding',  desc: 'Build portfolio site',  status: 'completed' },
  { id: 10, name: 'Walk',    desc: 'Evening walk 5km',      status: 'waiting'   },
];

let nextId        = 11;
let currentFilter = 'all';
let editingId     = null;
let bsModal       = null;

// Render
function render() {
  const tbody = document.getElementById('taskTableBody');
  tbody.innerHTML = '';

  const visible = tasks.filter(function(t) {
    if (currentFilter === 'completed') return t.status === 'completed';
    if (currentFilter === 'waiting')   return t.status === 'waiting';
    return true;
  });

  visible.forEach(function(task, index) {
    var isCompleted  = task.status === 'completed';
    var statusClass  = isCompleted ? 'text-success fw-semibold' : 'text-danger fw-semibold';
    var toggleLabel  = isCompleted ? 'completed' : 'waiting';
    var toggleBtnCls = isCompleted ? 'btn btn-success btn-sm me-1' : 'btn btn-warning btn-sm me-1';

    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td>' + (index + 1) + '</td>' +
      '<td>' + escHtml(task.name) + '</td>' +
      '<td>' + escHtml(task.desc) + '</td>' +
      '<td><span class="' + statusClass + '">' + task.status + '</span></td>' +
      '<td>' +
        '<button class="' + toggleBtnCls + '" onclick="toggleStatus(' + task.id + ')">' + toggleLabel + '</button>' +
        '<button class="btn btn-danger btn-sm me-1" onclick="deleteTask(' + task.id + ')" title="Delete"><i class="bi bi-trash"></i></button>' +
        '<button class="btn btn-warning btn-sm" onclick="openEdit(' + task.id + ')" title="Edit"><i class="bi bi-pencil"></i></button>' +
      '</td>';
    tbody.appendChild(tr);
  });
}

// Add Task
function addTask() {
  var name = document.getElementById('taskName').value.trim();
  var desc = document.getElementById('taskDesc').value.trim();

  if (!name) {
    alert('Please enter a task name.');
    return;
  }

  tasks.push({ id: nextId++, name: name, desc: desc, status: 'waiting' });
  document.getElementById('taskName').value = '';
  document.getElementById('taskDesc').value = '';
  render();
}

// Delete Task
function deleteTask(id) {
  tasks = tasks.filter(function(t) { return t.id !== id; });
  render();
}

// Toggle Status
function toggleStatus(id) {
  var task = tasks.find(function(t) { return t.id === id; });
  if (task) {
    task.status = task.status === 'completed' ? 'waiting' : 'completed';
    render();
  }
}

// Edit Modal (Bootstrap 5)
function openEdit(id) {
  var task = tasks.find(function(t) { return t.id === id; });
  if (!task) return;
  editingId = id;
  document.getElementById('editName').value = task.name;
  document.getElementById('editDesc').value = task.desc;

  if (!bsModal) {
    bsModal = new bootstrap.Modal(document.getElementById('editModal'));
  }
  bsModal.show();
}

function closeModal() {
  if (bsModal) bsModal.hide();
  editingId = null;
}

function saveEdit() {
  var name = document.getElementById('editName').value.trim();
  var desc = document.getElementById('editDesc').value.trim();

  if (!name) {
    alert('Task name cannot be empty.');
    return;
  }

  var task = tasks.find(function(t) { return t.id === editingId; });
  if (task) {
    task.name = name;
    task.desc = desc;
  }
  closeModal();
  render();
}

// Filter
function filterTasks(filter) {
  currentFilter = filter;

  ['all', 'completed', 'waiting'].forEach(function(f) {
    var btn = document.getElementById('btn-' + f);
    btn.classList.remove('btn-primary', 'btn-outline-primary');
    btn.classList.add(f === filter ? 'btn-primary' : 'btn-outline-primary');
  });

  render();
}

// Utility
function escHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Initial Render
render();
