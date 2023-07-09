$(document).ready(() => {
    let live_table = $("#live-tickets").DataTable({
        data: [],
        columns: [
            {data: "name"},
            {data: "phone"},
            {data: "location"},
            {data: "manage"},
        ],
    });

    function fetchLive() {
        fetch("/active-clients")
            .then((res) => res.json())
            .then((data) => {
                live_table.clear();
                Object.values(data).forEach((client) => {
                    let liveData = $("<tr>")
                        .append("<td>" + client.name + "</td>")
                        .append("<td>" + client.phone + "</td>")
                        .append("<td>" + client.city + "</td>")
                        .append(
                            $("<td>").html(
                                `<button class="btn btn-success btn-circle print" data-id="${client.clientID}"><i class="fas fa-print"></i></button>
                                       <button class="btn btn-danger btn-circle delete" data-id="${client.clientID}"><i class="fas fa-minus-circle"></i></button>`
                            )
                        );
                    liveData.attr("id", client.clientID);
                    live_table.row.add(liveData);
                });
                live_table.draw();
            })
            .catch((error) => console.error(error));

    }

    fetchLive();
    setInterval(fetchLive, 300000);




});

