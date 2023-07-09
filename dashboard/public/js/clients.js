$(document).ready(() => {


    let clientsTable = $("#Clients").DataTable({
        data: [],
        columns: [
            {data: "name"},
            {data: "phone"},
            {data: "location"},
            {data: "manage"},
        ],
    });

    fetch("/clients")
        .then((res) => res.json())
        .then((data) => {
            clientsTable.clear();
            Object.values(data).forEach((client) => {
                let clientData = $("<tr>")
                    .append("<td>" + client.name + "</td>")
                    .append("<td>" + client.phone + "</td>")
                    .append("<td>" + client.city + "</td>")
                    .append(
                        $("<td>").html(
                            `<button class="btn btn-success btn-circle print" data-id="${client.clientID}"><i class="fas fa-print"></i></button>
               <button class="btn btn-danger btn-circle delete" data-id="${client.clientID}"><i class="fas fa-minus-circle"></i></button>`
                        )
                    );
                clientData.attr("id", client.clientID);
                clientsTable.row.add(clientData);
            });
            clientsTable.draw();
        })
        .catch((error) => console.error(error));


});




