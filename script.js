document.addEventListener('DOMContentLoaded' , function(){
    fetchUser();

    document.getElementById('createForm').addEventListener('submit', function (event) {
        event.preventDefault();
        var formData = new FormData(this);
        fetch('create.php' ,{
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data =>{
            fetchUser();
            this.reset();
        })
        .catch(error => console.error("Error:" , error));
    });

    document.getElementById('editForm').addEventListener('submit' , function(event) {
        event.preventDefault();

        var formData = new FormData(this);
        console.log(formData);
        fetch('update.php' , {
            method: 'POST',
            body:  formData 
        })
        .then(response => response.text())
        .then(data => {
            fetchUser();
            var model = bootstrap.Modal.getInstance(document.getElementById('editUserModal'));
            model.hide();
        })
        .catch(error => console.error("Error:" , error));
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
    var formData = new FormData();
    formData.append('id' , id);

    fetch('delete.php' , {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        fetchUser();
    })
    .catch(error => console.error("Error:" , error));
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