curl -s 'https://api.github.com/repos/AntoniosBarotsis/coronaBot/commits' | 
jq -r '.[0].commit.author.date' | 
cat > src/lastUpdate.txt
# chmod +x ./src/getLastUpdate.sh
# ./src/getLastUpdate.sh 