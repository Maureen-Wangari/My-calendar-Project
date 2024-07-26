const isLeapYear = (year) => {
    return (
      (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
      (year % 100 === 0 && year % 400 === 0)
    );
  };
  const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
  };
  let calendar = document.querySelector('.calendar');
  const month_names = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let month_picker = document.querySelector('#month-picker');
  const dayTextFormate = document.querySelector('.day-text-formate');
  const timeFormate = document.querySelector('.time-formate');
  const dateFormate = document.querySelector('.date-formate');
  
  month_picker.onclick = () => {
    month_list.classList.remove('hideonce');
    month_list.classList.remove('hide');
    month_list.classList.add('show');
    dayTextFormate.classList.remove('showtime');
    dayTextFormate.classList.add('hidetime');
    timeFormate.classList.remove('showtime');
    timeFormate.classList.add('hideTime');
    dateFormate.classList.remove('showtime');
    dateFormate.classList.add('hideTime');
  };
  
  const generateCalendar = (month, year) => {
    let calendar_days = document.querySelector('.calendar-days');
    calendar_days.innerHTML = '';
    let calendar_header_year = document.querySelector('#year');
    let days_of_month = [
      31,
      getFebDays(year),
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];
    
    let currentDate = new Date();
    
    month_picker.innerHTML = month_names[month];
    
    calendar_header_year.innerHTML = year;
    
    let first_day = new Date(year, month);
  
  
  for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
  
      let day = document.createElement('div');
  
      if (i >= first_day.getDay()) {
        day.innerHTML = i - first_day.getDay() + 1;
  
        if (i - first_day.getDay() + 1 === currentDate.getDate() &&
          year === currentDate.getFullYear() &&
          month === currentDate.getMonth()
        ) {
          day.classList.add('current-date');
        }
      }
      calendar_days.appendChild(day);
    }
  };
  
  let month_list = calendar.querySelector('.month-list');
  month_names.forEach((e, index) => {
    let month = document.createElement('div');
    month.innerHTML = `<div>${e}</div>`;
  
    month_list.append(month);
    month.onclick = () => {
      currentMonth.value = index;
      generateCalendar(currentMonth.value, currentYear.value);
      month_list.classList.replace('show', 'hide');
      dayTextFormate.classList.remove('hideTime');
      dayTextFormate.classList.add('showtime');
      timeFormate.classList.remove('hideTime');
      timeFormate.classList.add('showtime');
      dateFormate.classList.remove('hideTime');
      dateFormate.classList.add('showtime');
    };
  });

  function openModal() {
    var modal = document.getElementById("eventModal");
    modal.style.display = "block";
  }

  function closeModal() {
    var modal = document.getElementById("eventModal");
    modal.style.display = "none";
  }

  document.getElementById('eventForm').addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    var eventTitle = document.getElementById('eventTitle').value;
    if (eventTitle.trim() !== '') {
      
      console.log(`Saving event: ${eventTitle}`);
      closeModal(); 
    }
  });
  

  window.onclick = function(event) {
    if (event.target == document.getElementById("eventModal")) {
      closeModal();
    }
  };
  

  // const generateCalendar = (month, year) => {
  
    
  //   // Add event listener to each day
  //   document.querySelectorAll('.calendar-days div').forEach(day => {
  //     day.addEventListener('click', function() {
  //       openModal(); // Open the modal
  //     });
  //   });
  // };
  
  (function () {
    month_list.classList.add('hideonce');
  })();
  document.querySelector('#pre-year').onclick = () => {
    --currentYear.value;
    generateCalendar(currentMonth.value, currentYear.value);
  };
  document.querySelector('#next-year').onclick = () => {
    ++currentYear.value;
    generateCalendar(currentMonth.value, currentYear.value);
  };

  function saveEvent() {
    const eventTitle = document.querySelector('#event-title').value;
    if (eventTitle.trim() !== '') {
      const newEvent = {
        title: eventTitle,
        startDate: new Date().toISOString(),
        endDate: new Date(new Date().setHours(new Date().getHours() + 1)).toISOString(), 
      };
      events.push(newEvent);
      localStorage.setItem('events', JSON.stringify(events));
      alert('Event saved!');
      document.querySelector('#event-title').value = ''; 
    } else {
      alert('Please enter an event title.');
    }
  }
  document.querySelector('#save-event').addEventListener('click', () => {
    const eventTitle = document.querySelector('#event-title').value;
    if (eventTitle.trim() !== '') {
      const newEvent = {
        title: eventTitle,
        startDate: new Date().toISOString(),
        endDate: new Date(new Date().setHours(new Date().getHours() + 1)).toISOString(), // Example: 1-hour event
      };
      events.push(newEvent);
      localStorage.setItem('events', JSON.stringify(events));
      alert('Event saved!');
    } else {
      alert('Please enter an event title.');
    }
  });
  
  function deleteEvent(eventId) {
    events = events.filter(e => e.id !== eventId);
    localStorage.setItem('events', JSON.stringify(events));
    alert('Event deleted!');
  }
  document.querySelector('#delete-event').addEventListener('click', () => {
    if (events.length > 0) {
      const lastEvent = events.pop(); // Removes the last item from the array
      localStorage.removeItem(lastEvent.id); // Remove the event from localStorage
      localStorage.setItem('events', JSON.stringify(events)); // Update localStorage with remaining events
      alert('Event deleted successfully!');
    } else {
      alert('No events to delete.');
    }
  });
  
  function editEvent(eventId, newTitle) {
    const eventIndex = events.findIndex(e => e.id === eventId);
    if (eventIndex !== -1) {
      events[eventIndex].title = newTitle;
      localStorage.setItem('events', JSON.stringify(events));
      alert('Event edited!');
    } else {
      alert('Event not found.');
    }
  }
  
  
  let currentDate = new Date();
  let currentMonth = { value: currentDate.getMonth() };
  let currentYear = { value: currentDate.getFullYear() };
  generateCalendar(currentMonth.value, currentYear.value);
  
  const todayShowTime = document.querySelector('.time-formate');
  const todayShowDate = document.querySelector('.date-formate');
  
  const currshowDate = new Date();
  const showCurrentDateOption = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  };
  const currentDateFormate = new Intl.DateTimeFormat(
    'en-US',
    showCurrentDateOption
  ).format(currshowDate);
  todayShowDate.textContent = currentDateFormate;
  setInterval(() => {
    const timer = new Date();
    const option = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    const formateTimer = new Intl.DateTimeFormat('en-us', option).format(timer);
    let time = `${`${timer.getHours()}`.padStart(
      2,
      '0'
    )}:${`${timer.getMinutes()}`.padStart(
      2,
      '0'
    )}: ${`${timer.getSeconds()}`.padStart(2, '0')}`;
    todayShowTime.textContent = formateTimer;
  }, 1000);