//Contact Form
jQuery(document).ready(function () {
    contact_form();

    function contact_form() {

        "use strict";

        jQuery(".contact_form #send_message").on('click', function () {

            var name = jQuery(".contact_form #name").val();
            var phone = jQuery(".contact_form #phone").val();
            var email = jQuery(".contact_form #email").val();
            var address = jQuery(".contact_form #address").val();
            var message = jQuery(".contact_form #message").val();
            var subject = jQuery(".contact_form #subject").val();
            var success = jQuery(".contact_form .returnmessage").data('success');

            jQuery(".contact_form .returnmessage").empty(); //To empty previous error/success message.
            //checking for blank fields	
            if (name === '' || phone === '' || email === '' || message === '') {

                jQuery('div.empty_notice').slideDown(500).delay(2000).slideUp(500);
            }
            else {
                // Returns successful data submission message when the entered information is stored in database.
                jQuery.post("contact.php", { ajax_name: name, ajax_phone: phone, ajax_email: email, ajax_address: address, ajax_message: message, ajax_subject: subject }, function (data) {

                    jQuery(".contact_form .returnmessage").append(data);//Append returned message to message paragraph


                    if (jQuery(".contact_form .returnmessage span.contact_error").length) {
                        jQuery(".contact_form .returnmessage").slideDown(500).delay(2000).slideUp(500);
                    } else {
                        jQuery(".contact_form .returnmessage").append("<span class='contact_success'>" + success + "</span>");
                        jQuery(".contact_form .returnmessage").slideDown(500).delay(4000).slideUp(500);
                    }

                    if (data === "") {
                        jQuery("#contact_form")[0].reset();//To reset form fields on success
                    }

                });
            }
            return false;
        });
    }
});