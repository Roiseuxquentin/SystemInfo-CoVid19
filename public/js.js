console.log("script loaded")

const THINKERVIEW = document.getElementById('thinkerview') 
const RX = document.getElementById('rx') 
const ECHO = document.getElementById('echo') 
const LOG = document.getElementById('log') 
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
		if ((data.alias.length > 500 ) || (data.msg.length > 500)) {
			return setting
		} else {
			setting = {
					    headers: {
					      'Accept': 'application/json',
					      'Content-Type': 'application/json'
					    },
					    method: method,
	 					body: JSON.stringify(data)
					}
		}
	}
	return setting
}

const worldWild = () => {
	return 	fetch('http://192.168.0.41:42333/echo',params("GET"))
		    .then(res => res.json())
		    .then(data => {
		    		console.log('%c DebuGg : ', 'background: orange; color: red' , data.rx )
		    	thkv = data.thinkerview.map(who => { return '<p style="word-break: break-all;width: 100%;margin:0;font-Size : 8.5px;"> ' +who+ '</p>' }).join('')
		    	school = '<a href="https://covidbot.clevy.io/" style="word-break: break-all;width: 100%;margin:0;font-Size : 8.5px;">COVIDbot</a>' 
		    	rx = '<audio style="margin:10px;" controls="none"> <source id="mp3" src='+data.rx+' type="audio/mpeg"></audio>'
		    	gold = '<div style="display : flex; heigth : 35px;" ><h6 style="color: black;font-Size:8px;text-decoration :underline;margin : 0px; heigth:35px;" >OR : </h6> <p style="color: gold;margin : 0px;heigth:35px;">'+data.gold+'</p></div>'
		    	btc = '<div style="display : flex; heigth : 35px;" ><h6 style="color: black;font-Size:8px; text-decoration :underline;margin : 0px; heigth:35px; " >Bitcoin : </h6> <p style="color: orange;margin : 0px;heigth:35px;">'+data.btc+'</p></div>'
		    	money = '<div style="border: solid 0.3px #454545; display : grid;justify-content :center;heigth : 70px; padding : 10px;" >'+gold+btc+'</div>'
		    	tweet = "<h4 style='heigth:0px;text-decoration : underline;' >TWEETER PARIS</h4><div style='padding:10px;border: solid 0.3px blue;'>"+data.tweetos.map(tweet => { return '<p style="margin:0;font-Size : 8px;"> ' +tweet+ ' </p>' }).join("")+'</div>' 
		    	google = "<h4 style='heigth:0px;text-decoration : underline;' >GOOGLE</h4>"+data.gooSearch.map(country => { return '<div style="margin-top :2px;border:solid 0.2px blue;padding : 10px;"> ' +country.map(goo => '<p style="margin:0;font-Size : 8px;"> ' +goo+ ' </p>').join("")+' </div>' }).join("") 
		    	ars = "<h4 style='heigth:0px;text-decoration : underline;' >ARS</h4><div style='border: solid 0.3px red;padding : 10px;'>"+data.ars.map(info => { return '<p style="margin:0;font-Size : 8px;"> ' +info+ ' </p>' }).join("")+'</div>' 
		    	thinkerviewCleaned = '<div style="display: grid;justify-content: center;"> <img src="./thkv.jpg" style="margin:auto;margin-top:10px;margin-bottom: 10px;" width="50px" height="50px" > ' + thkv + '	</div>'
		    	schoolCleaned = '<div style="display: grid;justify-content: center;"> <img src="./42.png" style="margin:auto;margin-top:10px;margin-bottom: 10px;" width="50px" height="50px" > ' + school + '	</div>'
		    	RX.innerHTML = rx 
		    	ECHO.innerHTML = ars+tweet+thinkerviewCleaned+schoolCleaned+'<hr>'+money+'<hr>'+google
		    	return 	
		    })
}

const LOAD = () => {

	return 	fetch('http://192.168.0.41:42333/logs',params("GET"))
		    .then(res => res.json())
		    .then(logs => logs.messages.map(log => { return '<p style="word-break: break-all;width: 100%;margin:0;font-Size : 12px;"> <span style="color:blue;font-Size:9px;" > ' +log.alias+ '</span> <span style="font-Size:9px;color:green;" > ' +log.date+ ' </span> : '+log.msg+' </p>' }) )
		    .then(allLog => LOG.innerHTML = allLog.reverse().join('')  )
}


document.addEventListener('keydown', (event) => {
	const nomTouche = event.key;
	if (nomTouche == "Enter" && INPUTmsg.value ) {
		//consig.json
		fetch('http://192.168.0.41:42333/bottle',params("POST",{alias : INPUTalias.value , msg : INPUTmsg.value}))
	    .then(res => res.json())
		.then(logs => {
			const allLog = logs.messages.map(log => { return '<p style="word-break: break-all;width: 100%;margin:0;font-Size : 12px;"> <span style="color:blue;font-Size:9px;" > ' +log.alias+ '</span> <span style="font-Size:9px;color:green;" > ' +log.date+ ' </span> : '+log.msg+' </p>' })
			LOG.innerHTML = allLog.reverse().join('')
			INPUTmsg.value = ''
		} )
	}		
})

worldWild()
LOAD()

