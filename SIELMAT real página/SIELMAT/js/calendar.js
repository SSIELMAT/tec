let currentMonth = document.querySelector(".current-month");
    let calendarDays = document.querySelector(".calendar-days");
    let today = new Date();
    let date = new Date();
    let selectedMode = null; // To track the current selection mode
    let selectedDays = []; // Array to store selected days

    currentMonth.textContent = date.toLocaleDateString("es-ES", {month:'long', year:'numeric'}).replace(/^\w/, (c) => c.toUpperCase());
    today.setHours(0,0,0,0);
    renderCalendar();

    function renderCalendar(){
        const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
        const totalMonthDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        const startWeekDay = new Date(date.getFullYear(), date.getMonth(), 0).getDay();
        
        calendarDays.innerHTML = "";
        
        let totalCalendarDay = 6 * 7;
        for (let i = 0; i < totalCalendarDay; i++) {
            let day = i - startWeekDay;
            
            if(i < startWeekDay){
                // adding previous month days
                calendarDays.innerHTML += `<div class='padding-day'>${prevLastDay - i}</div>`;
            } else if(i < startWeekDay + totalMonthDay){
                // adding this month days
                date.setDate(day + 1);
                date.setHours(0,0,0,0);
                
                let dayClass = date.getTime() === today.getTime() ? 'current-day' : 'month-day';
                calendarDays.innerHTML += `<div class='${dayClass}' data-date='${date.toISOString()}'>${day + 1}</div>`;
            } else {
                // adding next month days
                calendarDays.innerHTML += `<div class='padding-day'>${day - totalMonthDay + 1}</div>`;
            }
        }
    }

    document.getElementById('activity-btn').addEventListener('click', function() {
        selectedMode = 'activity'; // Set mode to activity
    });

    document.getElementById('availability-btn').addEventListener('click', function() {
        selectedMode = 'availability'; // Set mode to availability
    });

    calendarDays.addEventListener('click', function(event) {
        if (event.target.classList.contains('month-day') || event.target.classList.contains('current-day')) {
            const selectedDate = event.target.dataset.date;
            if (selectedMode === 'activity') {
                event.target.classList.toggle('selected-activity');
                event.target.classList.remove('selected-availability'); // Remove availability class if set
            } else if (selectedMode === 'availability') {
               event.target.classList.toggle('selected-availability');
                event.target.classList.remove('selected-activity'); // Remove activity class if set
            }
            // Track selected days
            if (selectedDays.includes(selectedDate)) {
                selectedDays = selectedDays.filter(date => date !== selectedDate);
            } else {
                selectedDays.push(selectedDate);
            }
        }
    });

    document.getElementById('ok-btn').addEventListener('click', function() {
        // Extract day numbers from selectedDays and format them
        const formattedDays = selectedDays.map(date => new Date(date).getDate()).join(', ');
        console.log("Selected Days:", formattedDays);
    });

    let currentMonthIndex = date.getMonth();
    let currentYear = date.getFullYear();

    document.querySelectorAll(".month-btn").forEach((element) => {
        element.addEventListener("click", () => {
            currentMonthIndex += element.classList.contains("prev") ? -1 : 1;
            
            if (currentMonthIndex < 0) {
                currentMonthIndex = 11;
                currentYear--;
            } else if (currentMonthIndex > 11) {
                currentMonthIndex = 0;
                currentYear++;
            }

            currentMonth.textContent = new Date(currentYear, currentMonthIndex)
                .toLocaleDateString("es-ES", { month: "long", year: "numeric" })
                .replace(/^\w/, (c) => c.toUpperCase()); // Capitalize the first letter

            renderCalendar();
        });
    });








/*document.querySelectorAll(".btn").forEach(function (element) {
	element.addEventListener("click", function () {
        let btnClass = element.classList;
        date = new Date(currentMonth.textContent);
        if(btnClass.contains("today"))
            date = new Date();
        else if(btnClass.contains("prev-year"))
            date = new Date(date.getFullYear()-1, 0, 1);
        else
            date = new Date(date.getFullYear()+1, 0, 1);
        
		currentMonth.textContent = date.toLocaleDateString("es-ES", {month:'long', year:'numeric'});
		renderCalendar();
	});
});*/