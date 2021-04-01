function getAPI(url, show) {
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            show(JSON.parse(this.responseText))
        }
    }
    xhttp.open('GET', url, true)
    xhttp.send()
}

function buildRegiao(regiaoList) {
    let select = document.getElementById('regiao')
    select.addEventListener('change', function () {
        let url = 'https://servicodados.ibge.gov.br/api/v1/localidades/'
        if (this.value == "Selecione") {
            url += 'estados'

        } else {
            url += `regioes/${this.value}/estados`
        }
        getAPI(url, uf)
    })

    for (i in regiaoList) {
        option = document.createElement('option')
        option.value = regiaoList[i].id
        option.innerHTML = regiaoList[i].nome
        document.getElementById('regiao').appendChild(option)
    }
}

function uf(ufList) {
    let select = document.getElementById('uf')
    select.addEventListener('change', function () {
        getAPI(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${this.value}/municipios`, municipio)
    })
    document.getElementById('uf').innerHTML = ''
    let option = document.createElement('option')
    option.innerHTML = "Selecione"
    document.getElementById('uf').appendChild(option)
    for (i in ufList) {
        let option = document.createElement('option')
        option.value = ufList[i].id
        option.innerHTML = `${ufList[i].nome}  (${ufList[i].sigla})`
        document.getElementById('uf').appendChild(option)
    }
}

function municipio(municipioList) {
    document.getElementById('municipio').innerHTML = ''
    let opcao = document.createElement('option')
    opcao.value = ""
    opcao.innerHTML = "Selecione"
    document.getElementById('municipio').appendChild(opcao)
    for (i in municipioList) {
        let option = document.createElement('option')
        option.value = municipioList[i].id
        option.innerHTML = municipioList[i].nome
        document.getElementById('municipio').appendChild(option)
    }
}
getAPI('https://servicodados.ibge.gov.br/api/v1/localidades/regioes', buildRegiao)