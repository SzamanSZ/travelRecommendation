const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');

// Function to create HTML for a destination card
        function createCard(title, imageUrl, description) {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${imageUrl}" alt="${title}">
                <div class="title">${title}</div>
                <div class="description">${description}</div>
            `;
            return card;
        }

function searchCondition() {
    const input = document.getElementById('conditionInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    const dataKeys = ["countries", "beaches", "temples"];
    
    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        if (dataKeys.includes(input)) {
    
        const result = data[input];
        console.log(result);
        if (result) {
                result.forEach(item => {
                    if (keyword === 'countries') {
                        item.cities.forEach(city => {
                            const card = createCard(city.name, city.imageUrl, city.description);
                            resultDiv.appendChild(card);
                        });
                    } else { // beaches and temples
                        const card = createCard(item.name, item.imageUrl, item.description);
                        resultDiv.appendChild(card);
                    }
                });
            } else {
                resultDiv.innerHTML = 'No data available for this keyword.';
            }
        
        } else {
          resultDiv.innerHTML = 'Condition not found.';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
  }

  function clearSearchCondition() {
    const inputElement = document.getElementById('conditionInput');
    const resultDivElement = document.getElementById('result');
    inputElement.value('');
    resultDivElement.innerHTML = '';
  }

    btnSearch.addEventListener('click', searchCondition);
    btnClear.addEventListener('click', clearSearchCondition);