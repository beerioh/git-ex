'use strict'
$(document).ready(initPage)


function initPage() {

  renderPortfolio()
}

function renderPortfolio() {
    const projs = getProjs()
    console.log(projs)
  var strHtmls = projs.map(
    (project) => `
    <div class="col-md-4 col-sm-6 portfolio-item" data-proj="${project.id}" >
    <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1">
      <div class="portfolio-hover">
        <div class="portfolio-hover-content">
          <i class="fa fa-plus fa-3x"></i>
        </div>
      </div>
      <img class="img-fluid" src="./img/portfolio/${project.id}.PNG" alt="${
      project.name
    } pic">
    </a>
    <div class="portfolio-caption">
      <h4>${project.name}</h4>
      <p class="text-muted title">${project.title}</p>
      ${project.labels
        .map((l) => `<p class="badge text-bg-warning label">${l}</p>`)
        .join('')}
    </div>
  </div>
    `
  )

  $('.items-container').html(strHtmls)
  $('.portfolio-item').on('click', renderModalInfo)
}

function renderModalInfo() {
  const id = $(this).data().proj
  const project = getProjById(id)

  const strHTML = `
  <h2>${project.name}</h2>
  <p class="item-intro text-muted">${project.title}.</p>
  <img class="img-fluid d-block mx-auto" src="./img/portfolio/${project.id}.PNG" alt="">
  <p>${project.desc}</p>
  <button class="btn btn-primary"><a href="./projects/${project.id}/index.html" target="_blank">Check it Out!</a></button>
  `

  $('.modal-body').html(strHTML)
}
