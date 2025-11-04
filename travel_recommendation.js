const btnSearch = document.getElementById('btnSearch');
const results = [];

function searchCondition() {
    const input = document.getElementById('conditionInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        const result = data.value.find(item => item.name.toLowerCase() === input);
        console.log(result);
        if (result.cities) {
            result = result.cities;
        }
        console.log(result);
        if (result) {
          const name = result.name;
          const imageUrl = result.imageUrl;
          const description = result.description;

          resultDiv.innerHTML += `<h2>${name}</h2>`;
          resultDiv.innerHTML += `<img src="./img/${imageUrl}" alt="${name}">`;

          resultDiv.innerHTML += `<p>${description}</p>`;
        } else {
          resultDiv.innerHTML = 'Condition not found.';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
  }
    btnSearch.addEventListener('click', searchCondition);