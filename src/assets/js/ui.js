var Header = {
    init: function () {
        if ($("h2.title").length > 0) {
            $("title").text($("h2.title").text() + " | soriClear 관리자");
        }
    }
};

var Aside = {
    init: function () {
        this.lnb();
    },
    lnb: function () {
        //페이지 타이틀명과 비교하여 활성화
        if ($(".sidebar").length > 0) {
            let title = $("h2.title").text();
            let $active = "";
            $(".sidebar a").each(function () {
                if ($(this).text() == title) {
                    $active = $(this);
                    $active.closest("li").addClass("active");
                    $active.closest(".has-treeview").addClass("open active");
                }
            });
            $(".dep1").css("opacity", "1");
            $(".dep2").show(); //임시로 전부 오픈
        }
        $(".sidebar .has-treeview > a").on("click", function (e) {
            e.preventDefault();
            $(this).closest("li").toggleClass("open");
        });
    },
};

var Common = {
    init: function () {
        this.datePicker();
        this.timePicker();
        this.event();
        window.addEventListener("mousewheel", Common.scrolling);
        window.addEventListener("touchmove", Common.scrolling);
        $(window).scroll(function () {
            Common.scrolling();
        });
    },
    scrolling: function (e) {
        var scrollTop = $(window).scrollTop();
        var gnbTop = $("#header").height();
        gnbTop = Number(gnbTop);

        if (scrollTop > 0) {
            $("html").addClass("is-scrolled");
        } else {
            $("html").removeClass("is-scrolled");
        }

        //scrollbar bottom check
        if ($("html").hasClass("is-scrolled")) {
            if (
                $(window).scrollTop() + $(window).height() >
                $(document).height() - 50
            ) {
                $("html").addClass("is-bottom");
            } else {
                $("html").removeClass("is-bottom");
            }
        }
    },
    datePicker: function () {
        //datepicker
        var currentDate = new Date();
        $(".form-datepicker").datepicker({
            defaultDate: +7,
            changeMonth: true,
            changeYear: true,
            monthNames: [
                "01","02","03","04","05","06","07","08","09","10","11","12",
            ],
            monthNamesShort: [
                "01","02","03","04","05","06","07","08","09","10","11","12",
            ],
            dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
            showMonthAfterYear: true,
            showOtherMonths: true,
            changeMonth: true,
            changeYear: true,
            dateFormat: "yy-mm-dd",
            gotoCurrent: true,
            beforeShow: function (input, inst) {
                $("#ui-datepicker-div").addClass("datepicker-box");
            },
        })
        .datepicker("setDate", "today");
    },
    timePicker: function () {
        //timepicker
        $(".form-timepicker").each(function () {
            $(this).timepicker({
                showMeridian: false,
                defaultTime: "00:00",
            });
        });
    },
    event: function () {
        $('[data-toggle="tooltip"]').tooltip();

        //custom scroll
        $(".overflow-y-scroll").mCustomScrollbar({
            theme: "dark",
        });
        $(".overflow-x-scroll").mCustomScrollbar({
            theme: "dark",
        });

        //모달 중첩 z-index 조정
        $(".modal").on("show.bs.modal", function (e) {
            var zIndex = 1040 + 10 * $(".modal:visible").length;
            $(this).css("z-index", zIndex);
            setTimeout(function () {
                $(".modal-backdrop")
                    .not(".modal-stack")
                    .css("z-index", zIndex - 1)
                    .addClass("modal-stack");
            }, 0);
        })
        .on("hidden.bs.modal", function () {
            if ($(".modal:visible").length > 0) {
                setTimeout(function () {
                    $(document.body).addClass("modal-open");
                }, 0);
            }
        });

        //table sort
        $('.table .sort').on('click', function () {
            $(this).toggleClass('active');
        });
    },
};

Header.init();
Aside.init();
Common.init();
