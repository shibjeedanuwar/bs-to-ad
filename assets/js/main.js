    const NepaliDate = window.NepaliDate;
    
    const nepaliMonths = [
        { name: "Baisakh", days: 30 },
        { name: "Jestha", days: 31 },
        { name: "Asar", days: 30 },
        { name: "Shrawan", days: 31 },
        { name: "Bhadra", days: 30 },
        { name: "Aswin", days: 29 },
        { name: "Kartik", days: 30 },
        { name: "Mangsir", days: 29 },
        { name: "Poush", days: 30 },
        { name: "Magh", days: 29 },
        { name: "Falgun", days: 30 },
        { name: "Chaitra", days: 30 }
    ];

    function populateNepaliDateSelectors() {
        const currentYear = new Date().getFullYear() + 57; // Approximation for Nepali calendar
        const $yearSelect = $('#nepaliYearInput');
        const $monthSelect = $('#nepaliMonthInput');
        const $daySelect = $('#nepaliDayInput');

        // Populate years
        for (let year = currentYear - 70; year <= currentYear + 10; year++) {
            $yearSelect.append(new Option(year, year));
        }

        // Populate months
        nepaliMonths.forEach((month, index) => {
            $monthSelect.append(new Option(month.name, index));
        });

        // Populate days
        updateDayOptions($monthSelect.val());

        // Change days based on month selection
        $monthSelect.change(() => {
            updateDayOptions($monthSelect.val());
        });
    }

    function updateDayOptions(monthIndex) {
        const $daySelect = $('#nepaliDayInput');
        $daySelect.empty(); // Clear previous options

        const maxDays = nepaliMonths[monthIndex].days;

        for (let day = 1; day <= maxDays; day++) {
            $daySelect.append(new Option(day, day));
        }
    }

    function handle_Error(arg) {
    $('#error_Handle').html(`<strong>Error!</strong> ${arg}`).show();
    
    // Hide the error message after 5 seconds
    setTimeout(() => {
        $('#error_Handle').hide(); // You can use .hide() if you prefer
    }, 5000); // 5000 milliseconds = 5 seconds
}

function copy_Handle(arg) {
    $('#copy_Handle').html(`<strong>Error!</strong> ${arg}`).show();
    
    // Hide the error message after 5 seconds
    setTimeout(() => {
        $('#error_Handle').hide(); // You can use .hide() if you prefer
    }, 5000); // 5000 milliseconds = 5 seconds
}

    // Call function to populate dropdowns
    populateNepaliDateSelectors();

    $('#toggleButton').click(() => {
    // Check if the Nepali to English section is currently visible
    if ($('#nepaliToEnglish').hasClass('d-none')) {
        // If it's hidden, show it and hide the English to Nepali section
        $('#nepaliToEnglish').removeClass('d-none');
        $('#englishToNepali').addClass('d-none');
        $('#toggleButton').text('Switch to English to Nepali'); // Update button text
    } else {
        // If it's visible, hide it and show the English to Nepali section
        $('#nepaliToEnglish').addClass('d-none');
        $('#englishToNepali').removeClass('d-none');
        $('#toggleButton').text('Switch to Nepali to English'); // Update button text
    }

    // Clear the result when switching
    $('#result').text('');

    // Remove 'active' class from calendars
    if ($('.calendar').hasClass('active')) {
        $('.calendar').removeClass('active');
        $('#shake').removeClass('shadow');
    }

    // here i'm remove #ht-text like stupid
        $('#ht-month').text('Month');
        $('#ht-day').text('Day');
        $('#ht-year').text('Year');

});

    $('#convertNepaliButton').click(() => {
        const year = parseInt($('#nepaliYearInput').val(), 10);
        const month = Number($('#nepaliMonthInput').val());
        const day = parseInt($('#nepaliDayInput').val(), 10);
        $('#nepaliToEnglish').addClass('d-none');

        // Check if day is valid
        if (day < 1 || day > nepaliMonths[month].days) {
            handle_Error('Invalid Nepali date.');
            return;
        }
        // Check if any input field is empty
    


        // alert('eng');
        try {
            const nepaliDate = new NepaliDate(year, month, day); // Month is 0-indexed
            const jsDate = nepaliDate.toJsDate();

            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = jsDate.toLocaleDateString('en-US', options);
            $('#result').text(`Converted English Date: ${formattedDate}`);


            // Extract year, month, and day from formattedDate
            const dateParts = formattedDate.split(' ');
            const monthName = dateParts[0].substring(0, 3); // Shortened month name
            const dayStr = dateParts[1].replace(',', '');
            const yearStr = dateParts[2];

            // You have to note here Update the elements  text vice varsa  values to maintain the eglish date stander
            $('#ht-year').text('Month');
            $('#js-year').text(monthName);
            $('#ht-month').text('Day');
            $('#js-month').text(dayStr);
            $('#ht-day').text('Year');
            $('#js-day').text(yearStr);

            
            //   you can uncommnet this but  before you have to frist Comment $('#ht-year')from 6  line of code
            /*$('#js-month').text(monthName);
            $('#js-day').text(dayStr);
            $('#js-year').text(yearStr);*/


            $('.calendar').toggleClass('active');
            if ($('.calendar').hasClass('active')) {
        $('#shake').addClass('shadow');
    }
            

        } catch (error) {
            handle_Error('Invalid Nepali date.');
        }
    });

    $('#convertEnglishButton').click(() => {

        const englishDateStr = $('#englishDateInput').val();
        if (englishDateStr=='') {
        handle_Error('Please enter the date.');
        return;
    }
    $('#englishToNepali').addClass('d-none');

        try {
            const jsDate = new Date(englishDateStr);
            const nepaliDate = new NepaliDate(jsDate);
            const formattedNepaliDate = nepaliDate.format('YYYY/MM/DD', 'en');

            // Extract year, month, and day from formattedNepaliDate
            const [year, month, day] = formattedNepaliDate.split('/').map(Number);
            $('#result').text(`Converted Nepali Date: ${year}/${nepaliMonths[month - 1].name}/${day}`);
            $('.calendar').toggleClass('active');
            if ($('.calendar').hasClass('active')) {
        $('#shake').addClass('shadow');
    }
            // Update the elements with the extracted values
            $('#js-year').text(year);
            $('#js-month').text(month); // Month name)
            $('#js-day').text(day);

        } catch (error) {
            handle_Error(arg)('Invalid English date. Please use MM-DD-YYYY.');
        }
    });



