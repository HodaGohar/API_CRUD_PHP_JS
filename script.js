document.addEventListener('DOMContentLoaded', function () {
    fetchUser();

    document.getElementById('createForm').addEventListener('submit', function (event) {
        event.preventDefault();
        var formData = new FormData(this);
        fetch('create.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            fetchUser();
            showMessage("Record created successfully!", "success");
            this.reset();
        })
        .catch(error => showMessage("Error creating record: " + error, "danger"));
    });

    document.getElementById('editForm').addEventListener('submit', function (event) {
        event.preventDefault();

        var formData = new FormData(this);
        fetch('update.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            fetchUser();
            showMessage("Record updated successfully!", "success");
            var modal = bootstrap.Modal.getInstance(document.getElementById('editUserModal'));
            modal.hide();
        })
        .catch(error => showMessage("Error updating record: " + error, "danger"));
    });
});

function fetchUser() {
    fetch('read.php')
    .then(response => response.json())
    .then(data => {
        var tbody = document.getElementById('userTableBody');
        tbody.innerHTML = '';
        data.forEach(user => {
            var tr = document.createElement('tr');
            tr.innerHTML = `
              <td>${user.id}</td>
              <td>${user.name}</td>
              <td>${user.email}</td>
              <td>${user.phone}</td>
              <td>${user.age}</td>
              <td>${user.city}</td>
              <td>
                   <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Delete</button>
                   <button class="btn btn-success btn-sm" onclick="editUser(${user.id}, '${user.name}', '${user.email}',
                   '${user.phone}', '${user.age}', '${user.city}')">Edit</button>
                   </td>
            `;
            tbody.appendChild(tr);
        });
    })
    .catch(error => showMessage('Error fetching users: ' + error, "danger"));
}

function deleteUser(id) {
    var formData = new FormData();
    formData.append('id', id);

    fetch('delete.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        fetchUser();
        showMessage("Record deleted successfully!", "success");
    })
    .catch(error => showMessage("Error deleting record: " + error, "danger"));
}

function editUser(id, name, email, phone, age, city) {
    document.getElementById('edit-id').value = id;
    document.getElementById('edit-name').value = name;
    document.getElementById('edit-email').value = email;
    document.getElementById('edit-phone').value = phone;
    document.getElementById('edit-age').value = age;
    document.getElementById('edit-city').value = city;
    
    var modal = new bootstrap.Modal(document.getElementById('editUserModal'));
    modal.show();
}

function showMessage(message, type) {
    var alertContainer = document.getElementById('alert-container');
    var alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.role = 'alert';
    alert.innerHTML = `
        ${message}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    `;
    alertContainer.appendChild(alert);

    // Automatically remove the alert after 5 seconds
    setTimeout(() => {
        alert.classList.remove('show');
        alert.classList.add('hide');
        setTimeout(() => alert.remove(), 500);
    }, 1000);
}
