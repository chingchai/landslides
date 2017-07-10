# You can also click on the "Gear" button in upper right of the client, select "Open in Git Shell" and type the command git fetch in the command window that is opened...
git remote -v
git fetch
git status
#On branch master
#Your branch is behind 'origin/master' by 1 commit, and can be fast-forwarded.
#  (use "git pull" to update your local branch)
# nothing to commit, working tree clean
git merge origin/master
git push -u origin master
