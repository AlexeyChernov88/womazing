(function ($)
  { "use strict"
  
/* 1. Preloder (готовый код, можно использовать в любом проекте) */
    $(window).on('load', function () {
      $('#preloader-active').delay(450).fadeOut('slow');
      $('body').delay(450).css({
        'overflow': 'visible'
      });
    });

/* 2. Sticky And Scroll UP */
    $(window).on('scroll', function () {
      var scroll = $(window).scrollTop();
      if (scroll < 400) {
        $(".header-sticky").removeClass("sticky-bar");
        $(".header-sticky").removeClass("main-header-scroll");
        $('#back-top').fadeOut(500);
      } else {
        $(".header-sticky").addClass("sticky-bar");
        $(".header-sticky").addClass("main-header-scroll");
        $('#back-top').fadeIn(500);
      }
    });

/* 3. HAMBURGER */

$('.humb').on('click',function(){
    $('.block-menu').toggle();
})

$('.close').on('click',function(){
    $('.block-menu').toggle();
})

/* 4. modwindows */

$('.links__item_phone-icon').on('click',function(){
    $('#wrapper-modal').addClass('active-modal');
})

$('#overlay-form').on('click',function(){
    $('#wrapper-modal').removeClass('active-modal');
})

$('#modal-form-close').on('click',function(){
    $('#wrapper-modal').removeClass('active-modal');
})

/* 5. modwindows-ok */

$('#overlay-ok').on('click',function(){
    $('#wrapper-modal-ok').removeClass('active-modal-ok');
})

$('#modal-ok-btn').on('click',function(){
    $('#wrapper-modal-ok').removeClass('active-modal-ok');
})
 
/* 6. Слайдер Slick */
 
    /* Offer-Slick */

  $('.offer-img-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    
    asNavFor: '.offer-slider'
    });
$('.offer-slider').slick({
     slidesToShow: 1,
     slidesToScroll: 1,
     asNavFor: '.offer-img-slider',
     fade: true,
     arrows: false,
     dots: true,
     centerMode: true,
     });

 /* Team-Slick */

$('.slider-team').slick({
     slidesToShow: 1,
     slidesToScroll: 1,
     asNavFor: '.offer-img-slider',
     fade: true,
     dots: true,
     centerMode: true,
     });


/* 7. Scroll new */
$('.offer__block-link-down').on('click', function () {
    let href = $(this).attr('href');

    $('html, body').animate({
          scrollTop: $(href).offset().top
      }, {
          duration: 300,
          easing:"linear"
     });

    return false;
  });


/* Validate */

$(document).ready(function() {
    $('.btn-form').on('click', function(e) {
        e.preventDefault();
        $(this).parent('form').submit();
    })
    $.validator.addMethod("regex",function(value, element, regexp) {
            let re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Пожалуйста, проверьте свой ввод"
    );


    function valEl(el) {
        el.validate({
            rules: {
                firstName: {
                    required: true,
                    regex : "[A-Za-zА-Яа-я]{1,32}"   
                },
                adressEmail: {
                    required: true,
                    minlength: 5,
                    maxlength: 30,
                    regex: "[^@]+@[^@]+\.[a-zA-Z]{2,6}"
                },
                phoneNumber: {
                    required: true,
                    minlength: 10,
                    maxlength: 13,
                    regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
                }
            },
            messages: {
                firstName: {
                    required: 'Обязательно к заполнению',
                    regex: 'Имя некорректно'
                },
                adressEmail: {
                    required: 'Обязательно к заполнению',
                    regex: 'Email некорректен'
                },
                phoneNumber: {
                    required: 'Обязательно к заполнению',
                    regex: 'Номер телефона некорректен'
                }
            },
            submitHandler: function(form) {
                $('#preloader-active').fadeIn();
                let $form = $(form);
                let $formId = $(form).attr('id');
                switch ($formId) {
                    case 'form-call':
                        $.ajax({
                            type: 'POST',
                            url: $form.attr('action'),
                            data: $form.serialize()
                            })
                            .done(function() {
                                console.log('Success');
                            })
                            .fail(function() {
                                console.log('fail');
                            })
                            .always(function() {
                                setTimeout(function() {
                                    $form.trigger('reset');
                                    $('#wrapper-modal').removeClass('active-modal');
                                }, 1000);
                                setTimeout(function () {
                                    $('#preloader-active').fadeOut();
                                }, 1400);
                                setTimeout(function () {
                                    $('#wrapper-modal-ok').addClass('active-modal-ok');
                                }, 1400);
                            });
                        break;
                }
                return false;
            }
        })
    }
    // Запускаем механизм валидации форм, если у них есть класс .form-val
    $('.form-val').each(function() {
        valEl($(this));
    });    
});

})(jQuery);





