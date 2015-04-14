/* this module implements a function which uses jquery to collect user entered data from text fields, checkboxes, and radio buttons storing in a JS object with the ids as keys for text field entries and the name attribute as keys for checkboxes and radio buttons. */
/* uses h3 headers to segment text fields, checkboxes, radio buttons into groups, which are stored as objects */
/* if want to eliminate entries for unchecked fields (save space but decreases db structuredness) eliminate else statements in checkbox and radio */

var jsonify = function(){
    var object = {};
    /* maps headers (mark off groups) to values used as keys for the containing object */
    var mapToCategory = {
        'Who interacts with clients for an initial assessment?':'who_initial',
        'What populations do you target/have specialized services for (check all that apply)?':'targeted_populations',
        'Languages (check all that apply)':'languages',
        'Do you accomodate services for people with special needs or disabilities?:':'disability_services',
        'Are there eligibility requirements?':'eligibility_req',
        '24 hour hotline':'hotline',
        'Shelter (specify who is eligible below)':'shelter_req',
        'In-Person Response':'ip_response',
        'Other':'other',
        'Housing':'housing',
        'Other Services':'other_services',
        'Do you provide HT related trainings?':'ht_training',
        'Do you screen for human trafficking cases?':'ht_screen',
        'Are you county specific?':'county_specific',
        'Who is your point person/contact person?':'point_person',
        'Where are you located?:':'location'
    }
    var category;
    /* finds text input boxes */
    $('div.form-group').each(function(){
        var siblings = false;
        if($(this).prev('h3') && $(this).children('[type=text]').length > 1){
            category = mapToCategory[$(this).prev('h3').text()];
            siblings = true;
            if(!object[category]) object[category] = {};
        }
        $(this).children('[type=text]').each(function(){
            if(siblings){
                object[category][$(this).attr('id')] = $(this).val();
            }
            else {
                object[$(this).attr('id')] = $(this).val();
            }
        });
    });
    $('div.checkbox').each(function(){
        if($(this).prev('h3')){
            category = mapToCategory[$(this).prev('h3').text()];
        }
        var group = {};
        $(this).children('label').each(function(){
            var name = $(this).children('[type=checkbox]').attr('name');
            if($(this).children('[type=checkbox]')[0].checked)
                group[name] = 1;
            else
                group[name] = 0;
        });
        $(this).children('[type=text]').each(function(){
            group[$(this).attr('id')] = $(this).val();
        });
        object[category] = group;
    });
    $('div.radio').each(function(){
        if($(this).prev('h3'))
            category = mapToCategory[$(this).prev('h3').text()];
        $(this).children('label').each(function(i){
            if($(this).children('[type=radio]')[0].checked){
                console.log('in checked radio')
                object[category] = 1;
                return;
            }
            else {
                if(!object[category])   /* the each function is called for both the yes and no radios. Therefore, since no is always the second, it will overwrite if not checked. */
                    object[category] = 0;
            }
                
        });
    });
    return object;
}