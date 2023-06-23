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
                            `<button class="btn btn-success btn-circle list" data-id="${client.clientID}"><i class="fas fa-list"></i></button>
               <button class="btn btn-secondary btn-circle edit" data-id="${client.clientID}"><i class="fas fa-edit"></i></button>
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
                    $("#deleteModal").modal("hide");
                    $("#Clients").DataTable().row($("#" + id)).remove().draw();
                }
            })
            .catch((error) => console.error(error));

    });
});


