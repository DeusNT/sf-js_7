function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {

    options = {
        path: '/',
        'max-age': 3600,
    };

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}

function deleteCookie(name) {
    setCookie(name, "", {
        'max-age': -1
    })
}

if(getCookie('city') !== undefined & getCookie('city') !== 'undefined773'){
    $('.city-area').hide();
    $('.city-info').html('Your city is ' + getCookie('city'));
    $('.city-data').show();
}

if(getCookie('filledBoxes') === '1'){
    let arr = getCookie('actualBoxes').split(',');
    for (b of arr){
        if(b !== ""){
            let klass = '.' + b;
            $(klass).prop('checked',true)
        }
    }
    $('.cbox').attr('disabled',true);
    $('#sbut').hide();
    $('#rbut').show()
}

$('#city').change(function() {
    let cn = $(this).val();
    setCookie('city', String(cn));
    console.log(cn)
});
let arr = [undefined, undefined, undefined, undefined, undefined, undefined];
$('.cbox').click(function () {
    let bname = String($(this).attr("class")).replace('cbox ', '');
    let n = Number(bname.replace('cb', '')) - 1;
    if($(this).is(':checked')){
        arr[n] = bname;
    }
    else if($(this).is(':not(:checked)')){
        arr[n] = undefined;
    }
});
$('#sbut').click(function() {
    let actualBoxes = arr.toString();
    setCookie('filledBoxes', '1');
    setCookie('actualBoxes', actualBoxes)
});
$('.clear-link').click(function() {
    setCookie('city', 'undefined773');
});
$('#rbut').click(function() {
    deleteCookie('filledBoxes');
    deleteCookie('actualBoxes');
    location.reload()
});