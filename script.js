const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav-ul');
const shortenBtn = document.getElementById('shortenBtn');
const advancedSection = document.querySelector('.advanced-statistics-section');
const advancedDiv = document.querySelector('.advanced');
let input = document.querySelector('input');
let errorMessage = document.getElementById('error-message');


hamburger.addEventListener('click', ()=> {
  nav.classList.toggle('open');
})

// very inconsistent speeds on shrtcode api - 6 secs to over a minute

async function useFetch() {
   let response = await fetch(`https://api.shrtco.de/v2/shorten?url=${input.value}`)

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  return data.result.short_link;
}



 async function getLinks() {

  if(input.value.trim() !== '') {
    input.style.border = 'none';
    errorMessage.style.display = 'none';
    const shortLink =  await useFetch();

    let div = document.createElement('div');

    div.innerHTML = `<div class="flex-column-link">
                      <div>${input.value}</div>
                      <hr>
                      <div class="shortlink">${shortLink}</div>
                      <button class="copyBtn">Copy</button>
                    </div>
                                  `;

        advancedSection.insertBefore(div, advancedDiv);

        div.addEventListener('click', (event) => {
            const isButton = event.target.nodeName === 'BUTTON';
            if (!isButton) {
                return;
            }

            let link = event.target.previousElementSibling.innerText;


            let inputElement = document.createElement('input');
            inputElement.setAttribute('value', link);
            document.body.appendChild(inputElement);
            inputElement.select();
            document.execCommand('copy');
            inputElement.parentNode.removeChild(inputElement);


            event.target.innerText = 'Copied!';
            event.target.style.backgroundColor = 'hsl(257, 27%, 26%)';
            input.value = '';
        })



    /*
    let copyBtn = document.querySelectorAll('.copyBtn');
    copyBtn.forEach(btn => btn.addEventListener('click', ()=> {

      let inputElement = document.createElement('input');
      inputElement.setAttribute('value', shortLink);
      document.body.appendChild(inputElement);
      inputElement.select();
      document.execCommand('copy');
      inputElement.parentNode.removeChild(inputElement);

      btn.innerText = 'Copied!';
      btn.style.backgroundColor = 'hsl(257, 27%, 26%)';
      input.value = '';
    }))
    */
      /*



      div.addEventListener('click', (event) => {
      const isButton = event.target.nodeName === 'BUTTON';
      if (!isButton) {
      return;
      }

      console.dir(event.target.);
    })





          input.select();
          input.setSelectionRange(0, 99999);

          document.execCommand("copy");

          btn.innerText = 'Copied!';
          btn.style.backgroundColor = 'hsl(257, 27%, 26%)';
          input.value = ''; */
  } else {
    input.style.border = '4px solid hsl(0, 87%, 67%)';
    errorMessage.style.color = 'hsl(0, 87%, 67%)';
    errorMessage.textContent = 'Please add a link';
    errorMessage.display.style = 'flex';
  }

}


shortenBtn.addEventListener('click', getLinks)
