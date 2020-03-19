## MONEY
GOLD=$(curl -s https://www.kitco.com/gold-price-today-europe/ | grep -A 1 'price per ounce' | sed '1d' | sed 's/<td>\|<\/td>\|[[:blank:]]\|\n//g' | sed 's/^/"/g' | sed 's/.$/€",/g')
# BITCOIN RATE
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




    # Détermine le moment de la journee
Instant() {

  H=$(date +%-H)
  M=$(date +%M)

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
   # Détermine le dernier podcast d'information via un flux rss/xml
   # Lit la premiere minute, uniquement le sommaire , les titres du journal
Instant
actuPod=$(curl -s $url  | grep -m 1 "mp3" | sed 's/<guid\|<\/guid\|>//g' |  sed 's/^.*url="\|" le.*$//g')


touch ghost.json
clear

echo '{ "tweetos" : [ ' $PARIS '], ' > ghost.json
echo '"thinkerview" : [ ' $THINKERVIEW '], ' >> ghost.json
echo ' TWEETOS _ OK'
echo '"gooSearch" : ' $GOOFR $GOOIE $GOOGB $GOOBE $GOOUS >> ghost.json
echo ' GOOGLE TRENDS _ OK'
echo '"gold" : '$GOLD >> ghost.json
echo ' GOLD _ OK'
echo '"btc" : '$BTC >> ghost.json
echo ' BITCOIN _ OK'
echo '"rx" : "'$actuPod'",' >> ghost.json
echo ' RX _ OK'
echo '"ars" : ['$ARS'] }' >> ghost.json
echo ' ARS _ OK'
