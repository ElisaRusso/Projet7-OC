Afin de démarrer le serveur veuillez suivre les étapes suivantes:

Etape 1: Cloner le répertoire Git

Etape 2: Dans le dossier backend, créer un fichier .env, compléter les paramètres suivants
avec vos identifiants vous permettant de vous connecter à votre base de donnée MySQL:
DB_BASE='//Nom de la base de données'
DB_HOST='//Nom d'hôte'
DB_USER='//Identifiant'
DB_PASS='//Mot de passe'

Etape 3: Dans la console taper les lignes suivantes:
	- cd frontend
	- cd vue-app
	- npm install
	- npm run serve
Etape 4: Ouvrir un nouvel onglet dans la console et taper:
	-cd backend
	-npm install
	-nodemon server

Dans la console devrait apparaître un message confirmant la connexion à la base de données.


