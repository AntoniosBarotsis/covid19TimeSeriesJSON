const shell =  require('shelljs');

shell.exec('chmod +x test.sh')

shell.exec('./test.sh')

shell.exec('git add .')
shell.exec('git commit -m "Update"')
shell.exec('git push')