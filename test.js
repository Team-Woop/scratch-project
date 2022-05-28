const help = 'help';
const help2 = 'help2'

// git checkout dev
// git pull origin dev
// git checkout [your branch]
// git merge dev
/*

<<<<<<< HEAD
=======
<<<<<<< HEAD
git:([name]) git add . 
git:([name]) git commit -m "[message here]"
git:([name]) git push origin [name]
git:([name]) git checkout Dev
git:(Dev) git pull origin [name]
*/
// hey
// =======
// >>>>>>> Dev
// git:([your branch]) git add . 
// git:([your branch]) git commit -m "[message here]"
// git:([your branch]) git push origin [your branch]
// git:([your branch]) git checkout Dev
// git:(Dev) git pull origin [your branch]
// */

// // cmd + shift + L => highlights/allows changes to 
// <<<<<<< HEAD
// // everything with the same name
// =======
// // everything with the same name
// >>>>>>> 3f9d56a (help #2)
// >>>>>>> Dev
