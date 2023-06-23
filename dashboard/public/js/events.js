$(document).ready(() => {

    let eventTable = $("#events").DataTable({
        data: [],
        columns: [{data: "id"}, {data: "name"}, {data: "image"}, {data: "desc"}, {data: "manage"}]
    });

    fetch("/event").then((res) => {
        res.json().then((data) => {
            eventTable.clear();
            Object.values(data).forEach((events) => {
                console.log(events);
                let eventsData = $('<tr>').append('<td>' + events.id + '</td>').append('<td>' + events.name + '</td>').append('<td>' + '<img class="rounded-circle" width="200px" height="128px" src=' + events.img + '>' + '</td>').append('<td>' + events.description + '</td>').append($('<td>').html(`
                                                <button class="btn btn-secondary btn-circle edit" id="${events.id}"> <i class="fas fa-edit"></i> </button>
                                                <button class="btn btn-danger btn-circle delete" data-id="${events.id}"> <i class="fas fa-minus-circle"></i> </button> `));
                eventTable.row.add(eventsData);
            });
            eventTable.draw();
        }).catch(error => console.error(error))
    })
});

$(document).on("click", ".edit", function () {
    // Get the event details from the current event item
    let eventId = $(this).attr("id")
    // Fetch the event details from the server
    fetch(`/event/${eventId}`)
        .then((res) => res.json())
        .then((event) => {
            // Fill the modal form fields with the event details
            $("#eventId").val(eventId);
            $("#eventName").val(event.name);
            $("#eventImg").val(event.img);
            $("#eventDescription").val(event.description);

            // Show the edit event modal
            $("#editEventModal").modal("show");
        })
        .catch((error) => console.error(error));
});

$("#saveChangesBtn").click(function () {
    // Get the updated event details from the form
    var eventId = $("#eventId").val();
    console.log(eventId);
    var eventName = $("#eventName").val();
    var eventImg = $("#eventImg").val();
    var eventDescripiton = $("#eventDescription").val();

    // Save the changes to the database using an AJAX request
    $.ajax({
        url: "http://localhost:3000/event/" + eventId, // Replace with the actual endpoint to update the event
        method: "PUT",
        data: {
            name: eventName,
            img: eventImg,
            description: eventDescripiton
        },
        success: function (response) {
            // Handle the success response
            console.log("Event updated successfully!");
            // Close the edit event modal
            $("#editEventModal").modal("hide");
            window.location.reload();
        },
        error: function (error) {
            // Handle the error response
            console.log("Error updating event:", error);
        }
    });
});


$(document).on("click", ".delete", function () {
    let eventId = $(this).data("id");

    // Show the delete modal
    $("#deleteEventModal").modal("show");

    // Handle the delete button click inside the modal
    $("#confirmDeleteBtn").click(function () {
        // Make an AJAX request to delete the event
        $.ajax({
            url: `/event/${eventId}`,
            type: "DELETE",
            success: function () {
                // Handle the success response or update the UI accordingly
                console.log("Event deleted successfully");
                // Close the delete modal
                $("#deleteEventModal").modal("hide");
                // Reload the page to reflect the updated event list
                window.location.reload();
            },
            error: function (error) {
                // Handle the error response or display an error message
                console.error("Error deleting event:", error);
                // ...
            }
        });
    });
});

// Get the modal element
var modal = document.getElementById("createEventModal");

// Get the button that opens the modal
var btn = document.getElementById("createEventBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Handle form submission
document.getElementById("submitEvent").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission

    // Retrieve the input values
    var eventName = document.getElementById("eventName").value;
    var eventImage = document.getElementById("eventImage").value;
    var eventDescription = document.getElementById("eventDescription").value;

    // Create an object with the event details
    var eventData = {
        name: eventName,
        img: eventImage,
        description: eventDescription
    };
    console.log(eventData);
    fetch("/event", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(eventData)
    })
        .then(function (response) {
            if (response.ok) {
                // Hide the modal
                modal.style.display = "none";
                window.location.reload();
                // Do something with the response from the server if needed
                console.log(response.json());
            }
        })
        .catch(function (error) {
            console.error("Error:", error);
        });
});
