$(document).ready(function () {
    
    ShowUserData();

});

function ShowUserData() {
    var userData = [];
    var url = '/Home/UserRegister';

    $.ajax({
        url: url,
        type: 'Get',
        datatype: 'Json',
        async: false,
        contentType: 'application/json;charset=utf-8;',
        success: function (result, statu, xhr) {
            debugger;
            var object = '';
            //console.log(result);
            $.each(result, function (index, item) {
                debugger;
                let dateOfBirth = new Date(parseInt(item.DateOfBirth.substr(6)));
                var date = dateOfBirth.getDate() + "/" + (dateOfBirth.getMonth() + 1) + "/" + dateOfBirth.getFullYear();
                var editoperation = '<a href="#" class="btn btn-primary btn-sm m-1" onclick="Edit(' + item.Userid + ')">Edit</a>';
                var deleteOperation = '<a href="#" class="btn btn-primary btn-sm m-1" onclick="Delete(' + item.Userid + ');">Delete</a>';
                var operation = editoperation + "|" + deleteOperation;
                var img = '<a href="#" onclick="ImgView(' + item.Userid + ');"><img src="' + item.ImagePath + '" style="width:100px;height:100px;"></a>';
                userData.push([item.Userid, img, item.Username, item.Email, item.Contact, item.Gender, date, item.Address, item.Country, item.State, item.Hobbies, operation])
               /* object += '<tr>';
               *//* var imgPath = item.ImagePath;
                var imgName = imgPath.split('\\').pop().split('/').pop();*//*
                object += '<td>' + item.Userid + '</td>';
                object += '<td>  <a href = "#" onclick = "ImgView(' + item.Userid + ');"><img src="' + item.ImagePath + '" style="width:100px;height:100px;"></a></td>';
                object += '<td>' + item.Username + '</td>';
                object += '<td>' + item.Email + '</td>';
                object += '<td>' + item.Contact + '</td>';
                object += '<td>' + item.Gender + '</td>';

                let dateOfBirth = new Date(parseInt(item.DateOfBirth.substr(6)));
                var date = dateOfBirth.getDate() + "/" + (dateOfBirth.getMonth() + 1) + "/" + dateOfBirth.getFullYear();

                object += '<td>' + date + '</td>';
                object += '<td>' + item.Address + '</td>';
                object += '<td>' + item.Country + '</td>';
                object += '<td>' + item.State + '</td>';
                object += '<td>' + item.Hobbies + '</td>';
                object += '<td><a href="#" class="btn btn-primary btn-sm m-2" onclick="Edit(' + item.Userid + ')">Edit</a> || <a href="#" class="btn btn-primary btn-sm m-2" onclick="Delete(' + item.Userid + ');">Delete</a></td>';

                object += '</tr>';*/

            });
           // $('#table_data').html(userData);
        },
        error: function () {
            alert('Data cannot get');
        }
    });
    $('#myTable').dataTable({
        data: userData
    })
};

/*function GetCountry() {
    $.ajax({
        url: '/Home/Country',
        success: function (result) {
            $.each(result, function (index, data) {
                $('#CountryText').append('<option value=' + data.CountryId + '>' + data.CountryName + '</option>');
            })
            
        }
    })
}*/


function ImgView(userid) {

    $.ajax({
        url: '/Home/ImgView?id=' + userid,
        type: 'Get',
        contentType: 'application/json;charset=utf-8;',
        dataType: 'json',
        success: function (data) {
            debugger;
            $('#AddUserModal').modal('show');
            $('#AddUserRecord').css('display', 'none');
            $('#btnUpdate').css('display', 'none');
            $('#UserHeader').text('Image');
            $('#imageView').show();
            $('#myForm').hide();
           // alert(data);
          //  $('#imageView').html('<img src="' + data + '"height="350" width="350">');
            $('#imageView').html('<img src="' + data + '" height="200" width="300">');
        },
        error: function () {
            alert('Something went wrong!!');
        }
    })
}

$('#btnAddRecord').click(function () {
    $('#eName').text("");
    $('#eEmail').text("");
    $('#eContact').text("");
    $('#eDob').text("");
    $('#eAddress').text("");
    $('#eCountry').text("");
    $('#eState').text("");
    $('#ePass').text("");
    $('#eImage').text("");
    $('#eHobby').text("");
    $('#AddUserModal').modal('show');

    $('#AddUserRecord').css('display', 'block');
    $('#btnUpdate').css('display', 'none');
    $('#UserHeader').text('Add Record');
    $('#passForm').show();
    $('#idForm').hide();
    $('#imageView').hide();
    $('#imgUpload').hide();

    resetResult();
})

function AddUserRecord() {
    var Name = $('#NameText').val();
    var CEmail = $('#EmailText').val();
    var CContact = $('#ContactText').val();
    var CDOB = $('#DateOfBirthText').val();
    var CAddress = $('#AddressText').val();
    var CCountry = $('#CountryText').val();
    var CState = $('#StateText').val();
    var CPassword = $('#PasswordText').val();
    var Img = $('#ImageText').val();

    var checkboxes =
        document.getElementsByName('Hobbie');

    var result = "";

    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            result += checkboxes[i].value
                + " ";
        }
    } result = result.trim();

    if (isValid(Name, CEmail, CContact, CDOB, CAddress, CCountry, CState, CPassword, Img, result) == false) {
        return false;
    }
    var selectedGender = document.getElementsByName('Gender');
    var gender = "";
    for (i = 0; i < selectedGender.length; i++) {
        if (selectedGender[i].checked) {
            gender = selectedGender[i].value;
        }
    }

    var fileImg = $('#ImageText').get(0).files;
    var extension = $("#ImageText").val().split('.').pop().toUpperCase();
    if (extension != "PNG" && extension != "JPG" && extension != "JPEG") {

        alert('Imvalid image file format,File format should be jpg, png, jpeg');
        return false;
    }
    /*let kb = image.files[0].size / 1024; // convert the file size into byte to kb
    let mb = kb / 1024; // convert kb to mb
    if (mb > 2) { // if the file size is gratter than maxMb
        return showError(`Image should be less than 2 MB`);
    }*/

    /*var objData = {
        Username : $('#NameText').val(),
        Email : $('#EmailText').val(),
        Contact: $('#ContactText').val(),
        Gender: gender,
        DateOfBirth: $('#DateOfBirthText').val(),
        Address : $('#AddressText').val(),
        Country: $('#CountryText').val(),
        Hobbies: result,
        State : $('#StateText').val(),
        Password: $('#PasswordText').val(),
        ImagePath: $('#ImageText').val()
       // FileName: fileImg[0]
    }*/



    var userdata = new FormData();
    userdata.append('Username', $('#NameText').val());
    userdata.append('Email', $('#EmailText').val());
    userdata.append('Contact', $('#ContactText').val());
    userdata.append('Gender', gender);
    userdata.append('DateOfBirth', $('#DateOfBirthText').val());
    userdata.append('Address', $('#AddressText').val());
    userdata.append('Country', $('#CountryText').val());
    userdata.append('State', $('#StateText').val());
    userdata.append('Hobbies', result);
    userdata.append('Password', $('#PasswordText').val());
    userdata.append('FileName', fileImg[0]);
    $.ajax({
        async: true,
        url: '/Home/AddUserRecord',
        type: 'Post',
        data: userdata,
        //contentType: 'application/xxx-www-form-urlencoded;charset=utf-8;',
        dataType: 'json',
        processData: false,
        contentType: false,
        success: function () {
            alert('Data Saved');
            resetResult();
            ShowUserData();
            hidemodal();
        },
        error: function () {
            alert('Failed to save');
        }
    });


}

$('#ImageText').change(function (e) {
    var files = e.target.files;
    $('#imgUpload').show();
    $('#imgUpload').attr("src", window.URL.createObjectURL(files[0]));
    if (files == '') {
        $('#imgUpload').hide();
        $('#imgUpload').attr("src", "");
    }
});

function hidemodal() {
    $('#AddUserModal').modal('hide');
}

function resetResult() {
    $('#NameText').val('');
    $('#EmailText').val('');
    $('#ContactText').val('');

    $('#DateOfBirthText').val('');
    $('#AddressText').val('');
    $('#CountryText').val('--Select Country--');
    $('#StateText').val('--Select State--');
    //document.getElementsByName('Hobbie').value('');
    $('#PasswordText').val('');
    $('#ImageText').val('');
    $('#imgUpload').hide();
    $('#imgUpload').attr("src", "");
    var checkboxes =
        document.getElementsByName('Hobbie');

    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkboxes[i].checked = false;
        }
    }
}
function isValidUpdate(Name, CEmail, CContact, CDOB, CAddress, CCountry, CState, result) {
    $('#eName').text("");
    $('#eEmail').text("");
    $('#eContact').text("");
    $('#eDob').text("");
    $('#eAddress').text("");
    $('#eCountry').text("");
    $('#eState').text("");
    //$('#ePass').text("");
   // $('#eImage').text("");
    $('#eHobby').text("");

    if (Name == '' || CEmail == '' || CContact == '' || CContact.length < 10 || CContact.length > 10 || CDOB == '' || CAddress == '' || CCountry == "--Select Country--" || CState == "--Select State--" || result == "") {
        if (Name == '') {
            $('#eName').text("*Name is required");
        } else if (Name != /[A - Za - z\\s]/) {
            $('#eName').text("*Name is Invalid");
        }
        if (CEmail == '') {
            $('#eEmail').text("*Email is required");
        } if (CContact == '') {
            $('#eContact').text("*Contact is required");
        } else if (CContact.length > 10 || CContact.length < 10) {
            $('#eContact').text("*Contact is invalid");
        }
        if (CDOB == '') {
            $('#eDob').text("*Date of bith is required");
        } if (CAddress == '') {
            $('#eAddress').text("*Address is required");
        } if (CCountry == '--Select Country--') {
            $('#eCountry').text("*Country is required");
        } if (CState == '--Select State--') {
            $('#eState').text("*State is required");

                } if (result == '') {
            $('#eHobby').text("*Please select Hobbies");
        }

        return false;
    }
    return true;
}

function isValid(Name, CEmail, CContact, CDOB, CAddress, CCountry, CState, CPassword, Img, result) {
    $('#eName').text("");
    $('#eEmail').text("");
    $('#eContact').text("");
    $('#eDob').text("");
    $('#eAddress').text("");
    $('#eCountry').text("");
    $('#eState').text("");
    $('#ePass').text("");
    $('#eImage').text("");
    $('#eHobby').text("");

    if (Name == '' || CEmail == '' || CContact == '' || CContact.length < 10 || CContact.length > 10 || CDOB == '' || CAddress == '' || CCountry == "--Select Country--" || CState == "--Select State--" || CPassword == '' || Img == '' || result == "") {
        if (Name == '') {
            $('#eName').text("*Name is required");
        } else if (Name != /[A - Za - z\\s]/) {
            $('#eName').text("*Name is Invalid");
        }
        if (CEmail == '') {
            $('#eEmail').text("*Email is required");
        } if (CContact == '') {
            $('#eContact').text("*Contact is required");
        } else if (CContact.length > 10 || CContact.length < 10) {
            $('#eContact').text("*Contact is invalid");
        }
        if (CDOB == '') {
            $('#eDob').text("*Date of bith is required");
        } if (CAddress == '') {
            $('#eAddress').text("*Address is required");
        } if (CCountry == '--Select Country--') {
            $('#eCountry').text("*Country is required");
        } if (CState == '--Select State--') {
            $('#eState').text("*State is required");
        } if (CPassword == '') {
            $('#ePass').text("*Password is required");
        } if (Img == '') {
            $('#eImage').text("*Image is required");
        } if (result == '') {
            $('#eHobby').text("*Please select Hobbies");
        }

        return false;
    }
    return true;
}

function Delete(Userid) {

    $.ajax({
        url: '/Home/Delete?id=' + Userid,
        success: function () {
            alert('Record Deleted!');
            ShowUserData();
        },
        error: function () {
            alert('Failed to Delete!');
        }
    })
}

function Edit(Userid) {
    
    $('#eName').text("");
    $('#eEmail').text("");
    $('#eContact').text("");
    $('#eDob').text("");
    $('#eAddress').text("");
    $('#eCountry').text("");
    $('#eState').text("");
    $('#ePass').text("");
    $('#eImage').text("");
    $('#eHobby').text("");
    $('#ImageText').val('');
    $.ajax({     
        url: '/Home/Edit?id=' + Userid,
        type: 'Get',
        contentType: 'application/json;charset=utf-8;',
        dataType: 'json',
        success: function (data) {
            debugger;
            console.log(data);

            $('#AddUserModal').modal('show');
            $('#idForm').show();

            $('#UserId').val(data[0].Userid);
            $('#NameText').val(data[0].Username);
            $('#EmailText').val(data[0].Email);
            $('#ContactText').val(data[0].Contact);

            let dateOfBirth = new Date(parseInt(data[0].DateOfBirth.substr(6)));
            var getdate = dateOfBirth.getDate();
            var setDate = "";
            if (getdate < 10) {
                setDate = "0" + getdate;
            } else {
                setDate = getdate;
            }
            var getmonth = (dateOfBirth.getMonth() + 1);
            var setMonth = "";
            if (getmonth < 10) {
                setMonth = "0" + getmonth;
            } else {
                setMonth = getmonth;
            }
            var date = dateOfBirth.getFullYear() + "-" + setMonth + "-" + setDate;
            document.getElementById('DateOfBirthText').value = date;



            var checkboxes =
                document.getElementsByName('Hobbie');

            var userHobby = data[0].Hobbies.split(" ");


            for (var i = 0; i < userHobby.length; i++) {
                for (var j = i; j < checkboxes.length; j++) {
                    if (checkboxes[j].value == userHobby[i]) {
                        checkboxes[j].checked = true;
                    }
                }
            }




            var selectedGender = document.getElementsByName('Gender');

            for (i = 0; i < selectedGender.length; i++) {
                if (selectedGender[i].value == data[0].Gender) {
                    selectedGender[i].checked = true;
                }
            }

            $('#AddressText').val(data[0].Address);
            $('#CountryText').val(data[0].Country);
            $('#StateText').val(data[0].State);

            $('#AddUserRecord').css('display', 'none');
            $('#btnUpdate').css('display', 'block');
            $('#UserHeader').text('Update Record');

            $('#imgUpload').css('display', 'block');
           /* var file = data[0].ImagePath.file[0];*/
            
            
            $("#imgUpload").attr("src", data[0].ImagePath);
            /*var fileImg = $("#imgUpload").get(0).files;
            $('#ImageText').val(fileImg[0]);*/
            $('#passForm').hide();
            $('#imageView').hide();

        },
        error: function () {
            alert('Data not found');
        }
    })
}

function UpdateUserRecord() {

    debugger;
    var Name = $('#NameText').val();
    var CEmail = $('#EmailText').val();
    var CContact = $('#ContactText').val();
    var CDOB = $('#DateOfBirthText').val();
    var CAddress = $('#AddressText').val();
    var CCountry = $('#CountryText').val();
    var CState = $('#StateText').val();
    // var CPassword = $('#PasswordText').val();
   // var Img = $('#ImageText').val();

    var checkboxes =
        document.getElementsByName('Hobbie');

    var result = "";

    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            result += checkboxes[i].value
                + " ";
        }
    } result = result.trim();

    if (isValidUpdate(Name, CEmail, CContact, CDOB, CAddress, CCountry, CState, result) == false) {
        return false;
    }
    var selectedGender = document.getElementsByName('Gender');
    var gender = "";
    for (i = 0; i < selectedGender.length; i++) {
        if (selectedGender[i].checked) {
            gender = selectedGender[i].value;
        }
    }
    if ($('#ImageText').val() != '') {
        var fileImg = $('#ImageText').get(0).files;
        var extension = $("#ImageText").val().split('.').pop().toUpperCase();
        if (extension != "PNG" && extension != "JPG" && extension != "GIF" && extension != "JPEG") {

            alert('Imvalid image file format.');
            return false;
        }
    }

    var userdata = new FormData();
    userdata.append('Userid', $('#UserId').val())
    userdata.append('Username', $('#NameText').val());
    userdata.append('Email', $('#EmailText').val());
    userdata.append('Contact', $('#ContactText').val());
    userdata.append('Gender', gender);
    userdata.append('DateOfBirth', $('#DateOfBirthText').val());
    userdata.append('Address', $('#AddressText').val());
    userdata.append('Country', $('#CountryText').val());
    userdata.append('State', $('#StateText').val());
    userdata.append('Hobbies', result);
    //userdata.append('Password', $('#PasswordText').val());
    if ($('#ImageText').val() != '') {
        userdata.append('FileName', fileImg[0]);
    }
    

    $.ajax({
        url: '/Home/Update',
        type: 'Post',
        data: userdata,
        //contentType: 'application/xxx-www-form-urlencoded;charset=utf-8;',
        dataType: 'json',
        processData: false,
        contentType: false,
        success: function () {
            alert('Data Updated');
            resetResult();
            ShowUserData();
            hidemodal();
        },
        error: function () {
            alert('Failed to save');
        }
    })
}


