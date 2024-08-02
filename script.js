document.addEventListener('DOMContentLoaded', function() {
    fetchUser();

    document.getElementById('createForm').addEventListener('submit', function(event) {
        event.preventDefault();

        var formData = new FormData(this);

        fetch('create.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(text);
                });
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                document.getElementById('message').innerText = 'User added successfully!';
                document.getElementById('message').className = 'alert alert-success';
                fetchUser();
                this.reset();
            } else {
                document.getElementById('message').innerText = 'Failed to add user: ' + data.message;
                document.getElementById('message').className = 'alert alert-danger';
            }
        })
        .catch(error => {
            document.getElementById('message').innerText = 'Error: ' + error.message;
            document.getElementById('message').className = 'alert alert-danger';
        });
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
                   '${user.phone}', '${user.age}','${user.city}'
                   )">Edit</button>
                   </td>
            `;
            tbody.appendChild(tr);
        });
    })
    .catch(error => console.error('Error:', error));
}

function deleteUser(id) {
    if (!confirm("Are you sure you want to delete this user?")) {
        return;
    }
    var formData = new FormData();
    formData.append('id' , id);

    fetch('delete.php' , {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => {
                throw new Error(text);
            });
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            document.getElementById('message').innerText = 'User deleted successfully!';
            document.getElementById('message').className = 'alert alert-success';
            fetchUser();
        } else {
            document.getElementById('message').innerText = 'Failed to delete user: ' + data.message;
            document.getElementById('message').className = 'alert alert-danger';
        }
    })
    .catch(error => {
        document.getElementById('message').innerText = 'Error: ' + error.message;
        document.getElementById('message').className = 'alert alert-danger';
    });
}

function editUser(id , name , email , phone , age , city) {
    document.getElementById('edit-id').value = id;
    document.getElementById('edit-name').value = name;
    document.getElementById('edit-email').value = email;
    document.getElementById('edit-phone').value = phone;
    document.getElementById('edit-age').value = age;
    document.getElementById('edit-city').value = city;
    
    var modal = new bootstrap.Modal(document.getElementById('editUserModal'));
        modal.show();
}