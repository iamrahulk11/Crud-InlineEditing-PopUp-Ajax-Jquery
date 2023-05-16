$(document).ready(function () {
    $('.edit-mode').hide();
    $('.edit-user, .cancel-user').on('click', function () {
        debugger;
        var tr = $(this).parents('tr:first');
        tr.find('.edit-mode, .display-mode').toggle();

    });

    function Contains(text_one, text_two) {
        if (text_one.indexOf(text_two) != -1) {
            return true;
        }
    }
    $('#search').keyup(function () {
            var searchText = $('#search').val().toLowerCase();
            $('.Searchtbl').each(function () {
                if (!Contains($(this).text().toLowerCase(),searchText)) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            });
        });
    
   // ShowUserData();

});


$('.save-user').on('click', function () {
    debugger;
    var userdata = new FormData();

    $('#Delete').hide();
    var $row = $(this).closest("tr"),
        $tds = $row.find("td");
    $.each($tds, function () {

        var userid = $tds.find("#userid").html();

        var User_Name = $tds.find("#NameText").val();
        var Email = $tds.find("#EmailText").val();
        var Contact = $tds.find("#ContactText").val();

        var selectedGender = $tds.find(document.getElementsByName('Gender'));
        var Gender = "";
        for (i = 0; i < selectedGender.length; i++) {
            if (selectedGender[i].checked) {
                Gender = selectedGender[i].value;
                break;
            }
        }

        //var Gender = tr.find("#GenderText").val();
        var DateOfBirth = $tds.find("#DateOfBirthText").val();
        var Address = $tds.find("#AddressText").val();
        var Country = $tds.find("#CountryText").val();
        var State = $tds.find("#StateText").val();


        var checkboxes =
            $tds.find(document.getElementsByName('Hobbie'));

        var result = "";

        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                result += checkboxes[i].value
                    + " ";
            }
        } result = result.trim();

        var ImagePath = "";
        if ($tds.find("#ImageText").val() != "") {
            var extension = $tds.find("#ImageText").val().split('.').pop().toUpperCase();
            if (extension != "PNG" && extension != "JPG" && extension != "JPEG") {

                alert('Invalid image file format,File format should be jpg, png, jpeg');
                return false;
            }
            ImagePath = $tds.find('#ImageText').get(0).files;
        }



        userdata.append('userid', userid)
        userdata.append('User_Name', User_Name);
        userdata.append('Email', Email);
        userdata.append('Contact', Contact);
        userdata.append('Gender', Gender);
        userdata.append('Date_Of_Birth', DateOfBirth);
        userdata.append('Address', Address);
        userdata.append('Country', Country);
        userdata.append('State', State);
        userdata.append('Hobbies', result);
        //userdata.append('Password', $('#PasswordText').val());
        if ($('#ImageText').val() != '') {
            userdata.append('FileName', ImagePath[0]);
        }
    });
    $.ajax({
        url: '/Home/Update',
        type: 'POST',
        data: userdata,
        dataType: 'json',
        processData: false,
        contentType: false,

        //contentType: 'application/json; charset=utf-8',
        success: function (data) {
            debugger;
            $tds.find("#lblName").text(data.User_Name);
            $tds.find("#lblEmail").text(data.Email);
            $tds.find("#lblContact").text(data.Contact);
            $tds.find("#lblGender").text(data.Gender);
            /*let dateOfBirth = new Date(parseInt(data.Date_Of_Birth.substr(6)));
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
            var date = dateOfBirth.getFullYear() + "-" + setMonth + "-" + setDate;*/
            // document.getElementById('DateOfBirthText').value = date;
            $tds.find("#lblDob").text(data.Date_Of_Birth);
            $tds.find("#lblAddress").text(data.Address);
            $tds.find("#lblCountry").text(data.Country);
            $tds.find("#lblState").text(data.State);
            $tds.find("#lblHobbies").text(data.Hobbies);
            $tds.find("#imgUpload").attr("src", data.ImagePath);
            //location.reload();
            $tds.find('.edit-mode, .display-mode').toggle();
            alert('Record updated Successfully!!')

        },
        error: function () {
            alert('Failed to save');
        }
    });
});



/*function ShowUserData() {
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
           
            //console.log(result);
            $.each(result, function (index, item) {
                debugger;
                let dateOfBirth = new Date(parseInt(item.DateOfBirth.substr(6)));
                var date = dateOfBirth.getDate() + "/" + (dateOfBirth.getMonth() + 1) + "/" + dateOfBirth.getFullYear();
                var editoperation = '<a href="#" class="btn btn-primary btn-sm m-1" onclick="Edit(' + item.Userid + ')">Edit</a>';
                var deleteOperation = '<a href="#" class="btn btn-primary btn-sm m-1" onclick="Delete(' + item.Userid + ');">Delete</a>';
                var operation = editoperation + "|" + deleteOperation;
                var img = '<a href="#" onclick="ImgView(' + item.Userid + ');"><img src="' + item.ImagePath + '" style="width:100px;height:100px;"></a>';
                userData.push([item.Userid,img, item.Username, item.Email, item.Contact, item.Gender, date, item.Address, item.Country, item.State, item.Hobbies, operation])
               *//* object += '<tr>';
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

                object += '</tr>';*//*

            });
           // $('#table_data').html(userData);
        },
        error: function () {
            alert('Data cannot get');
        }
    })
    $('#myTable').dataTable({
        data: userData
        
    });
}*/

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


$('.edit-user').on('click', function () {
    debugger;
    $('#Delete').hide();
    var $row = $(this).closest("tr"),
        $tds = $row.find("td");
    $.each($tds, function () {

        $tds.find("#NameText").val($tds.find('#lblName').text());

        $tds.find("#EmailText").val($tds.find('#lblEmail').text());
        $tds.find("#ContactText").val($tds.find('#lblContact').text());

        $tds.find("#AddressText").val($tds.find('#lblAddress').text());
        $tds.find("#DateOfBirthText").val($tds.find('#lblDob').text());
        $tds.find("#CountryText").val($tds.find('#lblCountry').text());
        $tds.find("#StateText").val($tds.find('#lblState').text());


        var selectedGender = $tds.find(document.getElementsByName('Gender'));
        var userGender = $tds.find('#lblGender').text();


        for (i = 0; i < selectedGender.length; i++) {
            if (selectedGender[i].value == userGender) {
                selectedGender[i].checked = true;

            }
        }


        var checkboxes =
            $tds.find(document.getElementsByName('Hobbie'));
        var Hobby = $tds.find('#lblHobbies').text();
        var userHobby = Hobby.split(" ");

        for (var i = 0; i < userHobby.length; i++) {
            for (var j = i; j < checkboxes.length; j++) {
                if (checkboxes[j].value == userHobby[i]) {
                    checkboxes[j].checked = true;
                }
            }
        }


    })



});


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

            $('#UserHeader').text('Image');
            $('#AddimageView').show();
            $('#myForm').hide();
            // alert(data);
            //  $('#imageView').html('<img src="' + data + '"height="350" width="350">');
            $('#AddimageView').html('<img src="' + data + '" height="200" width="300">');
        },
        error: function () {
            alert('Something went wrong!!');
        }
    })
}


$('#btnAddRecord').on('click', function () {

    $('.edit-mode').hide();
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
    $('#passForm').show();
    $('#AddimageView').hide();
    $('#AddimgUpload').hide();

    resetResult();
});


function AddUserRecord() {
    debugger;


    var Name = $('#AddNameText').val();
    var CEmail = $('#AddEmailText').val();
    var CContact = $('#AddContactText').val();
    var CDOB = $('#AddDateOfBirthText').val();
    var CAddress = $('#AddAddressText').val();
    var CCountry = $('#AddCountryText').val();
    var CState = $('#AddStateText').val();
    var CPassword = $('#AddPasswordText').val();
    var Img = $('#AddImageText').val();

    var checkboxes =
        document.getElementsByName('AddHobbie');

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
    var selectedGender = document.getElementsByName('AddGender');
    var gender = "";
    for (i = 0; i < selectedGender.length; i++) {
        if (selectedGender[i].checked) {
            gender = selectedGender[i].value;
        }
    }

    var fileImg = $('#AddImageText').get(0).files;
    var extension = $("#AddImageText").val().split('.').pop().toUpperCase();
    if (extension != "PNG" && extension != "JPG" && extension != "JPEG") {

        alert('Imvalid image file format,File format should be jpg, png, jpeg');
        return false;
    }

    var userdata = new FormData();
    userdata.append('User_Name', $('#AddNameText').val());
    userdata.append('Email', $('#AddEmailText').val());
    userdata.append('Contact', $('#AddContactText').val());
    userdata.append('Gender', gender);
    userdata.append('Date_Of_Birth', $('#AddDateOfBirthText').val());
    userdata.append('Address', $('#AddAddressText').val());
    userdata.append('Country', $('#AddCountryText').val());
    userdata.append('State', $('#AddStateText').val());
    userdata.append('Hobbies', result);
    userdata.append('Password', $('#AddPasswordText').val());
    userdata.append('FileName', fileImg[0]);
    $.ajax({
        async: false,
        url: '/Home/AddUserRecord',
        type: 'Post',
        data: userdata,
        //contentType: 'application/xxx-www-form-urlencoded;charset=utf-8;',
        dataType: 'json',

        processData: false,
        contentType: false,
        success: function () {
            if (!alert('Data Saved!')) { window.location.reload(); }
            resetResult();

            hidemodal();
            tr.find('.edit-mode, .display-mode').toggle();
        },
        error: function () {
            alert('Failed to save');
        }
    });
}


$('#AddImageText').change(function (e) {
    var files = e.target.files;
    $('#AddimgUpload').show();
    $('#AddimgUpload').attr("src", window.URL.createObjectURL(files[0]));
    if (files == '') {
        $('#AddimgUpload').hide();
        $('#AddimgUpload').attr("src", "");
    }
});

function hidemodal() {
    $('#AddUserModal').modal('hide');
}

function resetResult() {
    $('#AddNameText').val('');
    $('#AddEmailText').val('');
    $('#AddContactText').val('');

    $('#AddDateOfBirthText').val('');
    $('#AddAddressText').val('');
    $('#AddCountryText').val('--Select Country--');
    $('#AddStateText').val('--Select State--');
    //document.getElementsByName('Hobbie').value('');
    $('#AddPasswordText').val('');
    $('#AddImageText').val('');
    $('#AddimgUpload').hide();
    $('#AddimgUpload').attr("src", "");
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

function Delete(userid) {
    $('.edit-mode').hide();
    $.ajax({
        url: '/Home/Delete?id=' + userid,
        success: function () {
            if (!alert('Data Deleted!')) { window.location.reload(); }
            //location.reload();
            $('.edit-mode').hide();

        },
        error: function () {
            alert('Failed to Delete!');
        }
    })
}

/*$('#btnSearch').on('click', function () {
    var searchUserName = $('#search').val()
    $.ajax({
        url: '/Home/Getdata?search=' + searchUserName,
        type: "GET",
        
        success: function (result) {
            $('#TargetSearch').empty();
            $('#TargetSearch').html(result);
        }
    });
});*/


/*function search() {
    var searchUserName = $('#search').val();
    var userData = [];
    $.ajax({
        url: '/Home/getdata?search=' + searchUserName,
        type: 'Post',
        success: function (result, statu, xhr) {
            debugger;

            //console.log(result);
            $.each(result, function (index, item) {
                debugger;
                //  if (!alert('Data Saved!')) { window.location.reload(); }
                let dateOfBirth = new Date(parseInt(item.Date_Of_Birth.substr(6)));
                var date = dateOfBirth.getDate() + "/" + (dateOfBirth.getMonth() + 1) + "/" + dateOfBirth.getFullYear();
                var editoperation = '<a href="#" class="btn btn-primary btn-sm m-1" onclick="Edit(' + item.userid + ')">Edit</a>';
                var deleteOperation = '<a href="#" class="btn btn-primary btn-sm m-1" onclick="Delete(' + item.userid + ');">Delete</a>';
                var operation = editoperation + "|" + deleteOperation;
                var img = '<a href="#" onclick="ImgView(' + item.Userid + ');"><img src="' + item.ImagePath + '" style="width:100px;height:100px;"></a>';
                userData.push([item.userid, img, item.Username, item.Email, item.Contact, item.Gender, date, item.Address, item.Country, item.State, item.Hobbies, operation])
            })

            $("#myTable").replace(userData);
            console.log(result);
        },


        error: function () {
            alert('Failed to Search!');
        }
    })

}*/


/*function Delete(Userid) {

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
           *//* var file = data[0].ImagePath.file[0];*//*
            
            
            $("#imgUpload").attr("src", data[0].ImagePath);
            *//*var fileImg = $("#imgUpload").get(0).files;
            $('#ImageText').val(fileImg[0]);*//*
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
}*/


