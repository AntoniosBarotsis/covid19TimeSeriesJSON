curl -s 'https://api.github.com/repos/AntoniosBarotsis/coronaBot/commits' | 
jq -r '.[0].commit.author.date' | 
cat > test.txt