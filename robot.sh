################################################### 
#*/=============================================\*# 
# ||                      .__                  || #
# ||   ____   ____   ____ |  |   ____   ____   || #
# || _/ __ \_/ __ \ / ___\|  |  /  _ \ /  _ \  || #
# || \  ___/\  ___// /_/  >  |_(  <_> |  <_> ) || #
# ||  \___  >\___  >___  /|____/\____/ \____/  || #
# ||      \/     \/_____/                  2020|| #
#.\=============================================/.#
###################################################
# System Info War

#############
# CREATE FILE
#############

clear
touch ./data/otherInfo.json
touch ./data/COVIDinfo.json

#############
#SCRAP DATA
#############
echo " Start Scrapping DATA..."

## MONEY
GOLD=$(curl -s https://www.kitco.com/gold-price-today-europe/ | grep -A 1 'price per ounce' | sed '1d' | sed 's/<td>\|<\/td>\|[[:blank:]]\|\n//g' | sed 's/^/"/g' | sed 's/.$/€",/g')
## BITCOIN RATE
BTC=$(curl -s https://courscryptomonnaies.com/bitcoin | sed 's/>\| /\n/g' | grep € | grep x27 | sed 's/&#x27;\|<\/span//g' | sed 's/^/"/g' | sed 's/$/",/g')

## FLUX RSS AGENCE REGIONALE DE SANTE
ARS=$(curl -s https://www.iledefrance.ars.sante.fr/rss.xml | grep '<title' | head -n 5 | sed '1d' |sed 's/"\|<\/title>//'| sed 's/<title>/"/g' | sed 's/$/",/g' | sed '$ s/.$//g' )

## TWEETER TRENDS PARIS 
PARIS=$( curl -s "https://trends24.in/france/paris/" | sed 's/https/\n/g' | grep -o 'twitter.com/search?q=.*/a>' | sed 's/\(<\/a>\|">\|\/\)/\n/g' | sed 's/=\|twitter/\nsearch/g' | grep -v 'search' | sed -r '/^\s*$/d' | sed 's/^/"/g' | sed 's/$/",/g' | head -n 50 | awk '!a[$0]++' | sed '$ s/.$//g' )

## GOOGLE TRENDS
GOOFR=$(curl -s https://trends.google.com/trends/trendingsearches/daily/rss\?geo\=FR | grep '<title>' | sed 's/^.*<title>/"/g' | sed 's/<\/title>/",/g' | sed '1s/^.*$/[[  "🇫🇷",/g' | sed '$ s/.$/],/g' )
GOOIE=$(curl -s https://trends.google.com/trends/trendingsearches/daily/rss\?geo\=IE | grep '<title>' | head -n 5 | sed 's/^.*<title>/"/g' | sed 's/<\/title>/",/g' | sed '1s/^.*$/[ "🇮🇪",/g' | sed '$ s/.$/],/g' )
GOOGB=$(curl -s https://trends.google.com/trends/trendingsearches/daily/rss\?geo\=GB | grep '<title>' | head -n 5 | sed 's/^.*<title>/"/g' | sed 's/<\/title>/",/g' | sed '1s/^.*$/[ "🇬🇧",/g' | sed '$ s/.$/],/g' )
GOOBE=$(curl -s https://trends.google.com/trends/trendingsearches/daily/rss\?geo\=BE | grep '<title>' | head -n 5 | sed 's/^.*<title>/"/g' | sed 's/<\/title>/",/g' | sed '1s/^.*$/[ "🇧🇪",/g' | sed '$ s/.$/],/g' )
GOOUS=$(curl -s https://trends.google.com/trends/trendingsearches/daily/rss\?geo\=US | grep '<title>' | sed 's/^.*<title>/"/g' | sed 's/<\/title>/",/g' | sed '1s/^.*$/[ "🇺🇸",/g' | sed '$ s/.$/]],/g' )

THINKERVIEW=$(curl -s https://www.thinkerview.com/feed/ | grep title | head -n 6 | sed 's/^.*<title>/"/g' | sed 's/<\/title.*$/",/g' | sed 1d | sed '$ s/.$//g')

clear

Instant() {

  DAY=$(date +%d)
  lastDay=$(($DAY - 1))
  # lastDay=$(($DAY - 0))
  LASTDATE=""

  MONTH=$(date +%m)
  H=$(date +%-H)
  M=$(date +%M)

  if (( $DAY < 10 ))
    then
      LASTDATE=$(echo '2020-'$MONTH'-0'$lastDay)
    else
      # LASTDATE=$(echo '2020-'$MONTH'-'$lastDay)
      LASTDATE=$(echo '2020-'$MONTH'-'$DAY)
  fi

  # Détermine le moment de la journee
  if (( $H < 13 ))
    then
    moment="Bulletin du  matin"
    url="http://radiofrance-podcast.net/podcast09/rss_12559.xml"
    elif (( $H < 19 ))
      then
        moment="Bulletin du  midi"
        url="http://radiofrance-podcast.net/podcast09/rss_11673.xml"
    else
      moment="Bulletin du  soir"
      url="http://radiofrance-podcast.net/podcast09/rss_11736.xml"
  fi
}

Instant
## COVID fonctionne uniquement si la source est actuel & active
CODVID=$(curl -s https://raw.githubusercontent.com/opencovid19-fr/data/master/dist/chiffres-cles.json | sed -n '/"date": "2020-03-23"/,//p'  | sed '$d' )
# CODVID=$(curl -s https://raw.githubusercontent.com/opencovid19-fr/data/master/dist/chiffres-cles.json | grep -A 100 "$LASTDATE" | sed '$d' )
# Détermine le dernier podcast d'information via un flux rss/xml
actuPod=$(curl -s $url  | grep -m 1 "mp3" | sed 's/<guid\|<\/guid\|>//g' |  sed 's/^.*url="\|" le.*$//g')
clear

#############
#SCRAP DATA
#############
echo " Writting DATA :"

echo " "
echo " "
echo '{ "tweetos" : [ ' $PARIS '], ' > ./data/otherInfo.json
echo '   - TWEETOS _ OK'
echo " "
echo '"thinkerview" : [ ' $THINKERVIEW '], ' >> ./data/otherInfo.json
echo '   - THINKERVIEW _ OK'
echo " "
echo '"gooSearch" : ' $GOOFR $GOOIE $GOOGB $GOOBE $GOOUS >> ./data/otherInfo.json
echo '   - GOOGLE TRENDS _ OK'
echo " "
echo '"gold" : '$GOLD >> ./data/otherInfo.json
echo '   - GOLD _ OK'
echo " "
echo '"btc" : '$BTC >> ./data/otherInfo.json
echo '   - BITCOIN _ OK'
echo " "
echo '"rx" : "'$actuPod'",' >> ./data/otherInfo.json
echo '   - RX _ OK'
echo " "
echo '"ars" : ['$ARS'] }' >> ./data/otherInfo.json
echo '   - ARS _ OK'
echo " "
echo '[{'$CODVID > ./data/COVIDinfo.json  
echo '   - CODVID _ OK'
#############
#CONTROL JSON
#############

echo " "
echo " "
echo " _____________________"
echo " "
echo " "
#jq is json validator

cat ./data/otherInfo.json | jq empty
echo "   JSON INFO _ OK"

#jq is json validator
cat ./data/COVIDinfo.json | jq empty
echo "   JSON COVID-19 _ OK"

echo " "
echo " _____________________"

echo "                    ..D0n3.."
echo " "