// ################################################### 
// #*/=============================================\*# 
// # ||                      .__                  || #
// # ||   ____   ____   ____ |  |   ____   ____   || #
// # || _/ __ \_/ __ \ / ___\|  |  /  _ \ /  _ \  || #
// # || \  ___/\  ___// /_/  >  |_(  <_> |  <_> ) || #
// # ||  \___  >\___  >___  /|____/\____/ \____/  || #
// # ||      \/     \/_____/                  2020|| #
// #.\=============================================/.#
// ###################################################

// const ip = "192.168.0.41"
const ip = "88.121.253.98"
const port = 42333
const jour = "9"

const REFRESH = document.getElementById('refresh')
const THINKERVIEW = document.getElementById('thinkerview') 
const RX = document.getElementById('rx') 
const ECHO = document.getElementById('echo') 
const COV = document.getElementById('cov') 
const LOG = document.getElementById('log') 
const CURRENTDAY = document.getElementById('jour') 
const INPUTmsg = document.getElementById('inputMSG')
const INPUTalias = document.getElementById('inputALIAS')

const params = (method,data) => {
	let setting = {
		    headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    method: method,
		}
	if (data) {
		if ( (data.msg.length > 500) || (data.alias.length > 55) ) {
			return setting
		} else {
			setting.body = JSON.stringify(data)
		}
	}
	return setting
}


const LOAD = () => {

	return 	fetch(`http://${ip}:${port}/logs`,params("GET"))
		    .then(res => res.json())
		    .then(logs => logs.messages.map(log => { return `<p style="word-break: break-all;width: 100%;margin:0;font-Size : 12px;color : ${(log.alias == "information") ? "red" : "black"};"> <span style="color:${(log.alias == "information") ? "orange" : "blue"};font-Size:9px;" >${log.alias}</span> <span style="font-Size:9px;color:green;" >${log.date}</span> : ${log.msg}</p>` }) )
		    .then(allLog => LOG.innerHTML = allLog.reverse().join('')  )
}

const cov = () => {
	return 	fetch(`http://${ip}:${port}/cov`,params("GET"))
			    .then(res => res.json())
			    .then(res => 	{
			    	const region = res.filter(elt => (elt.nom == "Ile-de-France") || (elt.nom == "Eure-et-Loir") )
			    	const france = res.filter(elt => (elt.nom == "France") )
			    	const monde = res.filter(elt => (elt.nom == "Monde") )
			    	const coviData = region.concat(france[0]).concat(monde[0])

			    	return coviData.reverse()  })
			    .then(coviData => {
			    	const tabHeader = `<thead>
								        <tr>
								          <th style="padding:5px; font-Size : 12px;" scope="col">ZONE</th>
								          <th style="padding:5px; font-Size : 12px;" scope="col">CAS CONFIRM</th>
								          <th style="padding:5px; font-Size : 12px;" scope="col">DECES</th>
								          <th style="padding:5px; font-Size : 12px;" scope="col">SOURCE</th>
								        </tr>
								      </thead>`
			    	const info = coviData.map((elt) => `<tr  style="font-Size : 9px;" colspan="4"  ><td style="font-Size : 11px;padding : 5px;text-align : center;">
			    										${elt.nom}</td><td style="padding : 5px; text-align : center;font-Size : 11px;margin : 0;">
			    										${elt.casConfirmes ? elt.casConfirmes : " ??? "}</td><td style="color:red;padding : 5px; text-align : center;font-Size : 11px;margin : 0;">
			    										${elt.deces ? elt.deces : " ??? " }</td><td style="padding : 5px; font-Size : 11px;margin : 0;">
			    										${elt.source.nom}</td></tr>`)
			    	
			    	COV.innerHTML = `<table>${tabHeader}<tbody>${info.join('')}</tbody></table>`
			    })
}

const worldWild = () => {
	//config.json
	return 	fetch(`http://${ip}:${port}/echo`,params("GET"))
		    .then(res => res.json())
		    .then(data => {
		    	const section = (title,content) => { return `<div style="display:grid;">
		    													<h2 style="padding:5px;font-size:22px;text-decoration:underline;">
		    														${title.toUpperCase()} <input value="- " type="button" id="${title}Trigger"/>
	    														</h2>
		    													<div id="${title}" style="box-shadow: 2px 2px 10px #757575;
		    																			  margin : 10px;
		    																			  background: rgba(232, 236, 237, 0.4) ;
		    																			  width : 100%;
		    																			  padding:5px;">
																    ${content.toUpperCase()}
															    </div>
														    </div>`}

                const title = (title) => { return `<h3 style='margin:auto;margin-top:10px;font-size:15px;font-weight:400;heigth:0px;border-bottom:solid black 1px;width:70%;' >
                									${title}
            									  </h3>`}
                const body = (body) => { return `<div style="margin:5% 10% 5% 10%;
															border: solid 0.3px #454545;
															display : grid;
															justify-content :center;
															border-radius : 45;
															padding : 10px;" >
													 ${body}
												 </div>` }
		    	

		    	const thkv = data.thinkerview.map(who => { return '<p style="word-break: break-all;width: 100%;margin:0;font-Size : 8.5px;"> ' +who+ '</p>' }).join('')
		    	const school = '<a href="https://covidbot.clevy.io/" style="word-break: break-all;width: 100%;margin:0;font-Size : 8.5px;">COVIDbot</a>' 
		    	const gold = '<div style="display : flex; heigth : 35px;" ><h6 style="color: black;font-Size:8px;text-decoration :underline;margin : 0px; heigth:35px;" >OR : </h6> <p style="color: gold;margin : 0px;heigth:35px;">'+data.gold+'</p></div>'
		    	const btc = '<div style="display : flex; heigth : 35px;" ><h6 style="color: black;font-Size:8px; text-decoration :underline;margin : 0px; heigth:35px; " >Bitcoin : </h6> <p style="color: orange;margin : 0px;heigth:35px;">'+data.btc+'</p></div>'
		    	const money = '<div style="margin:5% 15% 5% 15%;border: solid 0.3px #454545; display : grid;justify-content :center;heigth : 70px; padding : 10px;" >'+gold+btc+'</div>'
				const tweet = data.tweetos.map(tweet => { return '<p style="margin:0;font-Size : 11px;"> ' +tweet+ ' </p>' }).join("") 
		    	const tweets = title("PARIS TWEETS DU MOMENT")+body(tweet)
		    	const google = title("GOOGLE TENDANCE DU JOUR")+ 
		    					data.gooSearch.map(country => { return body(country.map(goo => '<p style="margin:0;font-Size : 11px;"> ' +goo+ ' </p>').join("")) }).join("") 
		    	const ars = `${title("ARS")}${body(data.ars.map(info => { return '<p style="margin:0;font-Size : 11px;" > ' +info+ ' </p>' }).join(""))}`
		    	const thinkerviewCleaned = '<div style="display: grid;justify-content: center;"> <img src="./thkv.jpg" style="margin:auto;margin-top:10px;margin-bottom: 10px;" width="50px" height="50px" > ' + thkv + '	</div>'
		    	const schoolCleaned = '<div style="display: grid;justify-content: center;"> <img src="./42.png" style="margin:auto;margin-top:10px;margin-bottom: 10px;" width="50px" height="50px" > ' + school + '	</div>'
		    	
		    	const rxBuffer =`<audio style="margin:10px;" controls="none"> <source id="mp3" src="${data.rx}" type="audio/mpeg"></audio>`
		    	const rx = 

		    	ECHO.innerHTML = section("actualite",ars)+
		    					 title("Bulletin Radio France")+body(rxBuffer)+
		    					 section("indicateur",money+tweets+google)+
		    					 //section("candide","graphique pollution")+
		    					 thinkerviewCleaned+schoolCleaned+
		    					 section("ressources","")
		    	return
		    })
}

document.addEventListener('keydown', (event) => {
	const nomTouche = event.key;

	if (nomTouche == "Enter" && INPUTmsg.value ) {
		//consig.json
		fetch(`http://${ip}:${port}/bottle`,params("POST",{alias : INPUTalias.value , msg : INPUTmsg.value}))
	    .then(res => res.json())
		.then(logs => {
			const allLog = logs.messages.map(log => `<p style="word-break: break-all;width: 100%;margin:0;font-Size : 12px;color : ${(log.alias == "information") ? "red" : "black"};"> <span style="color:${(log.alias == "information") ? "orange" : "blue"};font-Size:9px;" >${log.alias}</span> <span style="font-Size:9px;color:green;" >${log.date}</span> : ${log.msg}</p>`  )
			LOG.innerHTML = allLog.reverse().join('')
			INPUTmsg.value = ''
		} )
	}
})

document.addEventListener('click', (e) => 	{ 
	(e.target.id == "refresh") ? LOAD() : true 
	let section = [ "actualiteTrigger","indicateurTrigger","keysTrigger","candideTrigger","ressourcesTrigger"]
	if (section.includes(e.target.id)) {
		if (e.target.value == "- ") {
			document.getElementById(e.target.id.split("Trigger").join("")).style.display = "none"
			document.getElementById(e.target.id).value = "+"
		} else {
			document.getElementById(e.target.id.split("Trigger").join("")).style.display = "block"
			document.getElementById(e.target.id).value = "- "
		}
	}else {
		console.log('%c DebuGg : ', 'background: orange; color: red' , "FAUX" )
	}
})

CURRENTDAY.innerHTML = `🇫🇷 JOUR ${jour} 🇫🇷` 

worldWild()
LOAD()
cov()