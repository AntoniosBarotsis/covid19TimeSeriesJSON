# Last date
LD=`cat src/lastUpdate.txt`

# Updates the file
curl -s 'https://api.github.com/repos/CSSEGISandData/COVID-19/commits' | 
jq -r '.[0].commit.author.date' | 
cat > src/lastUpdate.txt

# Current date
CD=`cat src/lastUpdate.txt`

if [ "$LD" == "$CD" ]; then # File dates are not the same, run npm start
    echo "Running update script..."
    npm run download
    node src/push.js
fi
