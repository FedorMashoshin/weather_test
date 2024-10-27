$(document).ready(function () {
    $('#search-btn').on('click', function () {
        let city = $('#city-input').val();
        if (city !== '') {
            getWeather(city);
        } else {
            alert('Please enter a city name');
        }
    });

    $('#city-input').on('keypress', function (e) {
        if (e.which === 13) {
            $('#search-btn').click();
        }
    });

    function getWeather(city) {
        const apiKey = 'bfd723830b59c52067da108a378280c1';
        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/weather`,
            type: 'GET',
            dataType: 'json',
            data: {
                q: city,
                units: 'metric',
                appid: apiKey
            },
            success: function (data) {
                displayWeather(data);
            },
            error: function () {
                alert('City not found');
            }
        });
    }

    function displayWeather(data) {
        $('.city-name').text(`${data.name}, ${data.sys.country}`);
        $('.date').text(formatDate(new Date()));
        $('.weather-icon').attr('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`);
        $('.temp').html(`${Math.round(data.main.temp)}&deg;C`);
        $('.weather-description').text(data.weather[0].description);
        $('.humidity').html(`<i class="fas fa-tint"></i> ${data.main.humidity}%`);
        $('.wind-speed').html(`<i class="fas fa-wind"></i> ${data.wind.speed} m/s`);
        $('.weather-info').addClass('show');
    }

    function formatDate(d) {
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
        return `${day}, ${date} ${month} ${year}`;
    }
});
