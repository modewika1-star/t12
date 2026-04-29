// var DEFAULT_PEOPLE = [
//   { id: 1,  name: 'Alice Johnson',   phone: '2025550101',  country: 'USA',          age: 28, email: 'alice@example.com',   status: 'active'   },
//   { id: 2,  name: 'Carlos Mendes',   phone: '11987654321', country: 'Brazil',       age: 34, email: 'carlos@example.com',  status: 'inactive' },
//   { id: 3,  name: 'Fatima Al-Zahra', phone: '501234567',   country: 'Saudi Arabia', age: 25, email: 'fatima@example.com',  status: 'active'   },
//   { id: 4,  name: 'Liam Smith',      phone: '2079460958',  country: 'UK',           age: 41, email: 'liam@example.com',    status: 'inactive' },
//   { id: 5,  name: 'Yuki Tanaka',     phone: '312345678',   country: 'Japan',        age: 30, email: 'yuki@example.com',    status: 'active'   },
//   { id: 6,  name: 'Amira Hassan',    phone: '1012345678',  country: 'Egypt',        age: 22, email: 'amira@example.com',   status: 'active'   },
//   { id: 7,  name: 'Noah Williams',   phone: '3105550199',  country: 'USA',          age: 37, email: 'noah@example.com',    status: 'inactive' },
//   { id: 8,  name: 'Sofia Rossi',     phone: '0612345678',  country: 'Italy',        age: 29, email: 'sofia@example.com',   status: 'active'   },
//   { id: 9,  name: 'Ahmed Khalil',    phone: '2125550177',  country: 'Turkey',       age: 45, email: 'ahmed@example.com',   status: 'inactive' },
//   { id: 10, name: 'Emma Dupont',     phone: '123456789',   country: 'France',       age: 33, email: 'emma@example.com',    status: 'active'   },
// ];

// var people        = JSON.parse(localStorage.getItem('people')) || DEFAULT_PEOPLE;
// var nextId        = people.length > 0 ? Math.max.apply(null, people.map(function(p) { return p.id; })) + 1 : 11;
// var currentFilter = 'all';
// var editingId     = null;
// var bsModal       = null;

// function savePeople() {
//   localStorage.setItem('people', JSON.stringify(people));
// }

// function render() {
//   var tbody = document.getElementById('peopleTableBody');
//   tbody.innerHTML = '';

//   var visible = people.filter(function(p) {
//     if (currentFilter === 'active')   return p.status === 'active';
//     if (currentFilter === 'inactive') return p.status === 'inactive';
//     return true;
//   });

//   visible.forEach(function(person, index) {
//     var isActive     = person.status === 'active';
//     var statusClass  = isActive ? 'text-success fw-semibold' : 'text-danger fw-semibold';
//     var toggleLabel  = isActive ? 'active' : 'inactive';
//     var toggleBtnCls = isActive ? 'btn btn-success btn-sm me-1' : 'btn btn-warning btn-sm me-1';

//     var tr = document.createElement('tr');
//     tr.innerHTML =
//       '<td>' + (index + 1) + '</td>' +
//       '<td>' + escHtml(person.name)    + '</td>' +
//       '<td>' + escHtml(person.phone)   + '</td>' +
//       '<td>' + escHtml(person.country) + '</td>' +
//       '<td>' + person.age              + '</td>' +
//       '<td>' + escHtml(person.email)   + '</td>' +
//       '<td><span class="' + statusClass + '">' + person.status + '</span></td>' +
//       '<td>' +
//         '<button class="' + toggleBtnCls + '" onclick="toggleStatus(' + person.id + ')">' + toggleLabel + '</button>' +
//         '<button class="btn btn-danger btn-sm me-1" onclick="deletePerson(' + person.id + ')" title="Delete"><i class="bi bi-trash"></i></button>' +
//         '<button class="btn btn-warning btn-sm" onclick="openEdit(' + person.id + ')" title="Edit"><i class="bi bi-pencil"></i></button>' +
//       '</td>';
//     tbody.appendChild(tr);
//   });
// }

// function addPerson() {
//   var name    = document.getElementById('personName').value.trim();
//   var phone   = document.getElementById('personPhone').value.trim();
//   var country = document.getElementById('personCountry').value.trim();
//   var age     = parseInt(document.getElementById('personAge').value, 10);
//   var email   = document.getElementById('personEmail').value.trim();

//   if (!name) {
//     alert('put task name first');
//     return;
//   }

//   if (!phone) {
//     alert('put phone number first');
//     return;
//   }

//   if (!country) {
//     alert('put country first');
//     return;
//   }

//   if (isNaN(age)) {
//     alert('put age first');
//     return;
//   }

//   if (!email) {
//     alert('put email first');
//     return;
//   }

//   var duplicate = people.some(function(p) { return p.name.toLowerCase() === name.toLowerCase(); });
//   if (duplicate) {
//     alert('this task name already exist please change name ');
//     return;
//   }

//   people.push({
//     id:      nextId++,
//     name:    name,
//     phone:   phone,
//     country: country,
//     age:     isNaN(age) ? '' : age,
//     email:   email,
//     status:  'active'
//   });

//   document.getElementById('personName').value    = '';
//   document.getElementById('personPhone').value   = '';
//   document.getElementById('personCountry').value = '';
//   document.getElementById('personAge').value     = '';
//   document.getElementById('personEmail').value   = '';

//   savePeople();
//   render();
// }

// function deletePerson(id) {
//   people = people.filter(function(p) { return p.id !== id; });
//   savePeople();
//   render();
// }

// function toggleStatus(id) {
//   var person = people.find(function(p) { return p.id === id; });
//   if (person) {
//     person.status = person.status === 'active' ? 'inactive' : 'active';
//     savePeople();
//     render();
//   }
// }

// function openEdit(id) {
//   var person = people.find(function(p) { return p.id === id; });
//   if (!person) return;

//   editingId = id;
//   document.getElementById('editName').value    = person.name;
//   document.getElementById('editPhone').value   = person.phone;
//   document.getElementById('editCountry').value = person.country;
//   document.getElementById('editAge').value     = person.age;
//   document.getElementById('editEmail').value   = person.email;

//   if (!bsModal) {
//     bsModal = new bootstrap.Modal(document.getElementById('editModal'));
//   }
//   bsModal.show();
// }

// function closeModal() {
//   if (bsModal) bsModal.hide();
//   editingId = null;
// }

// function saveEdit() {
//   var name    = document.getElementById('editName').value.trim();
//   var phone   = document.getElementById('editPhone').value.trim();
//   var country = document.getElementById('editCountry').value.trim();
//   var age     = parseInt(document.getElementById('editAge').value, 10);
//   var email   = document.getElementById('editEmail').value.trim();

//   if (!name) {
//     alert('Full name cannot be empty.');
//     return;
//   }

//   var duplicate = people.some(function(p) { return p.id !== editingId && p.name.toLowerCase() === name.toLowerCase(); });
//   if (duplicate) {
//     alert('this task name already exist please change name ');
//     return;
//   }

//   var person = people.find(function(p) { return p.id === editingId; });
//   if (person) {
//     person.name    = name;
//     person.phone   = phone;
//     person.country = country;
//     person.age     = isNaN(age) ? '' : age;
//     person.email   = email;
//   }

//   savePeople();
//   closeModal();
//   render();
// }


// function clearPeople() {
//   people = [];
//   nextId = 1;
//   localStorage.setItem('people', '[]');
//   render();
// }

// function filterPeople(filter) {
//   currentFilter = filter;

//   ['all', 'active', 'inactive'].forEach(function(f) {
//     var btn = document.getElementById('btn-' + f);
//     btn.classList.remove('btn-primary', 'btn-outline-primary');
//     btn.classList.add(f === filter ? 'btn-primary' : 'btn-outline-primary');
//   });

//   render();
// }

// function escHtml(str) {
//   if (!str) return '';
//   return String(str)
//     .replace(/&/g, '&amp;')
//     .replace(/</g, '&lt;')
//     .replace(/>/g, '&gt;')
//     .replace(/"/g, '&quot;');
// }


// document.addEventListener('DOMContentLoaded', function() {
//   ['personName', 'personPhone', 'personCountry', 'personAge', 'personEmail'].forEach(function(id) {
//     document.getElementById(id).addEventListener('keydown', function(e) {
//       if (e.key === 'Enter') addPerson();
//     });
//   });
// });

// render();
