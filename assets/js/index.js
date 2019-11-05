$(function() {


    //form part

    // variables
    var $contact = $('#contact'); //form
    var $adoption_reasons = $("#adoption_reasons"); // textarea field
    var $select_cat = $("#select_cat"); // select field
    var $selectDefault = $("#selectDefault"); // select tab selected by default

    // ArrayList of cats
    var catList = [{
            name: $("#choice1").val()
        },
        {
            name: $("#choice2").val()
        },
        {
            name: $("#choice3").val()
        },
        {
            name: $("#choice4").val()
        },
        {
            name: $("#choice5").val()
        }
    ]


    // check errors functions
    function checkErrorsSelect() {
        $('.group-select .is-invalid').removeClass('is-invalid');
        $(".group-select .is-valid").removeClass("is-valid");
        $(".group-select .invalid-feedback").remove();
        $(".group-select .valid-feedback").remove();
        $('#contact .danger-custom').remove();
    }

    function checkErrorsText() {
        $('.group-textarea .is-invalid').removeClass('is-invalid');
        $(".group-textarea .is-valid").removeClass("is-valid");
        $(".group-textarea .invalid-feedback").remove();
        $(".group-textarea .valid-feedback").remove();
        $('#contact .danger-custom').remove();
    }


    // change state event select
    $select_cat.on("change", function() {

        // errors cleaning
        checkErrorsSelect();

        // loop of object in array catlist
        for (i in catList) {

            if ($("select option:checked").val() === catList[i].name) {

                $select_cat.addClass("is-valid");
                $select_cat.parent().append("<div class='valid-feedback'>Merci pour " + catList[i].name + " !</div>")

            } else if ($("select option:checked").val() === $selectDefault.val()) {
                checkErrorsSelect();
                $select_cat.addClass("is-invalid");
                $select_cat.parent().append("<div class='invalid-feedback'>Veuillez sélectionner au moins un chat s'il vous plaît</div>")
            }
        }


    }); // end event change select

    // keyup state event textarea
    $adoption_reasons.on("keyup", function() {

        //errors cleaning
        checkErrorsText();

        if ($adoption_reasons.val().length === 0 || $adoption_reasons.val().length < 30) {
            $adoption_reasons.addClass("is-invalid");
            $adoption_reasons.parent().append("<div class='invalid-feedback'>Veuillez entrer au minimum 30 caractères s'il vous plaît.</div>")
        } else {
            $adoption_reasons.addClass("is-valid");
            $adoption_reasons.parent().append("<div class='valid-feedback'>Prêt à l'envoi Miaou !</div>")

        }
    }) // end event keyup

    // event submit 
    $("#contact").on("submit", function(e) {

        e.preventDefault();

        // errors cleaning
        $('#contact .danger-custom').remove();

        if ($contact.find(".is-invalid").length === 0 && $adoption_reasons.val().length !== 0 && $("select option:checked").val() !== $selectDefault.val()) {
            $contact.replaceWith(`
        <div class="alert alert-success">
            Votre demande a bien été envoyée !
            Nous vous répondrons dans les meilleurs délais.
        </div>
    `);

        } else {

            $('#contact').append(`
        <div class="danger-custom">
            <p>Nous n'avons pas été en mesure de valider votre demande. Vérifiez vos informations.<p>
        </div>
    `);
        }

    }); // end event submit


}) // end jQuery