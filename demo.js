const axios = require('axios');
const inquirer = require('inquirer');

const apiUrl = 'https://samples.openweathermap.org/data/2.5/forecast/hourly?q=London,us&appid=b6907d289e10d714a6e88b30761fae22';

async function getWeatherData() {
  const { date } = await inquirer.prompt({
    type: 'input',
    name: 'date',
    message: 'Enter the date (YYYY-MM-DD HH:mm:ss):',
  });

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    const weatherData = data.list.find(item => item.dt_txt === date);
    if (weatherData) {
      console.log(`Temperature on ${date}: ${weatherData.main.temp} °C`);
    } else {
      console.log('Data not found for the given date.');
    }
    menu();
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    menu();
  }
}

async function getWindSpeedData() {
  const { date } = await inquirer.prompt({
    type: 'input',
    name: 'date',
    message: 'Enter the date (YYYY-MM-DD HH:mm:ss):',
  });

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    const weatherData = data.list.find(item => item.dt_txt === date);
    if (weatherData) {
      console.log(`Wind Speed on ${date}: ${weatherData.wind.speed} m/s`);
    } else {
      console.log('Data not found for the given date.');
    }
    menu();
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    menu();
  }
}

async function getPressureData() {
  const { date } = await inquirer.prompt({
    type: 'input',
    name: 'date',
    message: 'Enter the date (YYYY-MM-DD HH:mm:ss):',
  });

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    const weatherData = data.list.find(item => item.dt_txt === date);
    if (weatherData) {
      console.log(`Pressure on ${date}: ${weatherData.main.pressure} hPa`);
    } else {
      console.log('Data not found for the given date.');
    }
    menu();
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    menu();
  }
}

function menu() {
  inquirer
    .prompt({
      type: 'list',
      name: 'choice',
      message: 'Menu:',
      choices: [
        'Get weather',
        'Get Wind Speed',
        'Get Pressure',
        'Exit'
      ],
    })
    .then(answer => {
      switch (answer.choice) {
        case 'Get weather':
          getWeatherData();
          break;
        case 'Get Wind Speed':
          getWindSpeedData();
          break;
        case 'Get Pressure':
          getPressureData();
          break;
        case 'Exit':
          console.log('Goodbye!');
          break;
      }
    });
}

menu();