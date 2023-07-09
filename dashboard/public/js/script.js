$("#loginBtn").click(function (e) {
    e.preventDefault();
    let email = $("#emailIn").val();
    let password = $("#passwordIn").val();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    fetch('/login', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong');
            }
        })
        .then(data => {
            console.log(data);
            localStorage.setItem('token', data.token);
            window.location.href = "/";
        })
        .catch(error => {
            console.error(error);
            alert('An error occurred while logging in.');
        });
});

$("#logout").click(function () {
    fetch('/logout', {
        method: 'POST'
    })
        .then(response => {
            if (response.ok) {
                // Redirect to the login page or perform any other desired action
                window.location.href = "/login";
            } else {
                throw new Error('Failed to logout');
            }
        })
        .catch(error => {
            console.error(error);
            alert('An error occurred while logging out.');
        });
});

$(document).on("click", ".delete", function () {
    let id = $(this).data("id");
    console.log(id);


    //show delete modal
    $("#deleteClientModal").modal("show");

    $("#confirmDeleteBtn").click(() => {

        //delete client
        fetch("/clients/" + id, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    $("#deleteClientModal").modal("hide");
                    $("#Clients").DataTable().row($("#" + id)).remove().draw();
                }
            })
            .catch((error) => console.error(error));

    });
});


function generateClientHtml(client) {
    let clientHtml = `
    <div class="client-details">
      <h1><i class="fas fa-user"></i> Client: ${client.name}</h1>
      <h2><i class="fas fa-phone"></i> Phone: ${client.phone}</h2>
      <div class="location-details">
        <div class="row">
          <div class="col">
            <p><i class="fas fa-map-marker-alt"></i> <strong>Location:</strong></p>
          </div>
          <div class="col">
            <p>${client.city}</p>
          </div>
          <div class="col">
            <p>${client.street}</p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <p><i class="fas fa-home"></i> <strong>House No:</strong> ${client.houseNo}</p>
          </div>
          <div class="col">
            <p><i class="fas fa-building"></i> <strong>Apart No:</strong> ${client.apartmentNo}</p>
          </div>
          <div class="col">
            <p><i class="fas fa-layer-group"></i> <strong>Floor No:</strong> ${client.floorNo}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="rooms-container">
      <h2><i class="fas fa-door-open"></i> Rooms:</h2>
      <div class="row">`;

    let roomCounter = 0;

    client.rooms.forEach((room) => {
        console.log(room);
        if (roomCounter % 3 === 0 && roomCounter !== 0) {
            clientHtml += '</div><div class="row">';
        }
        clientHtml += `
        <div class="col">
          <div class="room-details">
            <h3><i class="fas fa-door-closed"></i> Room: ${room.roomName}</h3>
            <div class="field">
              <label for="door-color-${room.roomName}"><i class="fas fa-paint-brush"></i> Door Color:</label>
              <span id="door-color-${room.roomName}">${room.color}</span>
            </div>
            <div class="field">
              <label for="door-id-${room.roomName}"><i class="fas fa-id-card"></i> Door ID:</label>
              <span id="door-id-${room.roomName}">${room.doorID}</span>
            </div>
            <div class="field">
              <label for="measurement-${room.roomName}"><i class="fas fa-ruler-vertical"></i> Height:</label>
              <span id="measurement-${room.roomName}">${room.measurement}</span>
            </div>
            <div class="field">
              <label for="width-${room.roomName}"><i class="fas fa-ruler-horizontal"></i> Width:</label>
              <span id="width-${room.roomName}">${room.width}</span>
            </div>
            <div class="field">
              <label for="notes-${room.roomName}"><i class="fas fa-sticky-note"></i> Notes:</label>
            </div>
            <span id="notes-${room.roomName}">${room.notes}</span>
          </div>
        </div>`;
        roomCounter++;
    });

    clientHtml += `</div></div>`;

    return clientHtml;
}




function createPrintPage(clientID, content) {
    let printWindow = window.open("", `_blank`, "width=800,height=600");
    printWindow.document.open();
    printWindow.document.write(`
    <html>
      <head>
        <link href="../public/fonts/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
  <link
          href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
          rel="stylesheet">
        <title>Print Client: ${clientID}</title>
        <style>
          body {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .client-details {
            margin-bottom: 20px;
          }
          .location-details {
            margin-top: 10px;
          }
          .row {
            display: flex;
          }
          .col {
            flex: 1;
          }
          .location-details .row .col {
  flex: 1;
  margin-right: 10px; 
}
          .col p {
            margin: 0;
          }
          .rooms-container {
            border-top: 1px solid #ccc;
            padding-top: 20px;
          }
          .client-details .location-details .row .col {
  flex: 0 0 auto; 
}
.room-details {
  border: 1px solid #ccc;
  padding: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

.field {
  display: flex;
  margin-bottom: 10px;
}

.field label {
  width: 120px;
  font-weight: bold;
  margin-right: 10px;
}

.field span {
  flex: 1;
}
        </style>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `);
    // printWindow.document.close();
}



$(document).on("click", ".print", function () {
    let clientID = $(this).data("id");

    fetch("/clients/" + clientID)
        .then((res) => res.json())
        .then((data) => {
            let clientHtml = generateClientHtml(data);
            createPrintPage(clientID, clientHtml);

        });
});
