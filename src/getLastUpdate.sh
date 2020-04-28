# Last date
LD=`cat src/lastUpdate.txt`

# Updates the file
curl -s 'https://api.github.com/repos/AntoniosBarotsis/coronaBot/commits' | 
jq -r '.[0].commit.author.date' | 
cat > src/lastUpdate.txt

# Current date
CD=`cat src/lastUpdate.txt`

node src/push.js
# if [ "$LD" != "$CD" ]; then # Files are not the same, run npm start
#     echo "Running update script..."
#     npm run download
#     node push.js
# fi
