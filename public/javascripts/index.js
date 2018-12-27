function createUser() {
    poptable();

    
    $.get("/create", {
        user: $("#first_name").val()
    }, function(data){
        if(data){
            poptable();
        }
    })
}

function poptable(){
    $('#table-body').html('');

    $.get('/search', function (allitems) {
        allitems.forEach(item => {
            $('#table-body').append('<tr><td>' + item.username + '</td><td>' + item.birthday +
                '</td></tr>')
        });
    })
}

$(document).ready(function () {
    poptable()
})