// https://github.com/amine-lotfi

const API_url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const search_button = document.getElementById('search-button');

const result = document.getElementById('result-container');

const word_sound = document.getElementById("word-sound");

const array_Length = 0;

search_button.addEventListener("click", () => {

    let word_input = document.getElementById('word-input').value;
    // console.log(word_input);

    // this is used to fetch data from the JSON file
    fetch(`${API_url}${word_input}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            result.innerHTML = `
            
            <div class="row">

                <div class="col-md-12">
                    <div class="result-word">
                        <h3 class="text-light float-start">${word_input}</h3>
                        <button class="float-end" onclick="playWordSound()"><i class="bi bi-volume-up-fill"></i></button>
                    </div>
                </div>

            <div class="col-md-12 text-start">
                <div class="result-details">
                    <p class="text-lead text-light d-inline me-2">${data[0].meanings[0].partOfSpeech}</p>
                    <p class="text-lead text-light d-inline">
                    ${data[0].phonetic}</p>

                    <p class="text-lead text-light d-block mt-3">Synonyms:<br>
                    ${data[0].meanings[0].synonyms && data[0].meanings[0].synonyms.length > 0 ?
                        data[0].meanings[0].synonyms.map(synonym => `<span>${synonym}</span>`).join(', ') :
                        "No synonym has been found :("}</p>
                </div>
            </div>

            <div class="col-md-10 result-meaning mt-3">
                <p class="text-lead text-light text-start">Definitions:<br>
                - ${data[0].meanings[0].definitions[0].definition}
                <br>
                - ${data[0].meanings[0].definitions[1].definition}
                <br>
                - ${data[0].meanings[0].definitions[2].definition}
                <br>
                - ${data[0].meanings[0].definitions[3].definition}
                </p>
            </div>

            <div class="col-md-10 mt-3">
                <div class="result-example" id="search-button">
                    <p class="text-lead text-light text-start">
                    ${data[0].meanings[0].definitions[0].example || ""}
                    </p>
                </div>
            </div>

            </div> `; // innerHTML ends here

            //console.log(`https:${data[0].phonetics[0].audio}`);    

            // this to give the audio a src property to play it
            word_sound.setAttribute("src", `${data[0].phonetics[0].audio}`);

        })
        .catch(() => {
            result.innerHTML = `<h5 class="text-light">Word not found, please double check the spelling :(</h5>`;
        });

});

// this plays the word sound
function playWordSound() {

    word_sound.play()

}