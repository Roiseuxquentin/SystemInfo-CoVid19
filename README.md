# COVID-19 System Info
##### Communication - Target Flux - RaspberryPi - NodeJs

Acces via : 
>  http://88.121.253.98:42333/

![alt text](https://github.com/Roiseuxquentin/SystemInfo-CoVid19/blob/master/readmeIMG.png)
##### START
- ###### 1 - install node module :
  ```
  git clone url_project SI
  cd SI
  npm install
  ```
- ###### 2 - config

/!\ *Change variable value "const ip = XXX.XXX.XXX.XXX" in ./public/js.js and put your's* /!\

- ###### 3 - start server
  ```
  node index.js
  ```
- ###### 4 - Extract & Transform & Save Data to json
  ```
  bash robot.sh 
  ```
- ###### 5 - Go to
  ```
  http://localhost:42333/
  ```

##### RESSOURCES
- https://www.gouvernement.fr/
###### COVID data : 
 https://raw.githubusercontent.com/opencovid19-fr/data/master/dist/chiffres-cles.json
###### RADIO :
Scrapping flux RSS france inter
###### TRENDS :
 - google : https://trends.google.com/trends/trendingsearches/daily?geo=FR
 - tweeter : https://trends24.in/france/

                                                                  *eegloo*
