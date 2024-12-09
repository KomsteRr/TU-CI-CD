Projet ToDoList

> Ce projet implémente une application de gestion de tâches (ToDoList) en JavaScript, avec des tests unitaires réalisés à l’aide de Vitest.

Fonctionnalités

-	Utilisateur valide :
	-	Un utilisateur doit avoir :
	-	Une adresse email valide.
	-	Un prénom et un nom.
	-	Un mot de passe entre 8 et 40 caractères contenant au moins une majuscule, une minuscule et un chiffre.
	-	Au moins 13 ans.
-	Gestion des ToDoList :
	-	Chaque utilisateur ne peut posséder qu’une seule ToDoList.
	-	Une ToDoList peut contenir entre 0 et 10 tâches.
	-	Les tâches doivent être espacées d’au moins 30 minutes.
-	Une tâche contient :
	-	Un nom unique.
	-	Un contenu (maximum 1000 caractères).
 	-	Une date de création.
-	Notifications et contraintes :
  -	À l’ajout de la 8ᵉ tâche, un email est simulé pour informer l’utilisateur que sa liste est presque pleine.
  -	Une méthode save est implémentée mais lève toujours une exception.

Installation

1.  Clonez le projet :

``` js
git clone <url_du_repository>
cd CC-Test-unitaire
```

2.  Installez les dépendances :

``` js
npm install
```

Lancer les tests

Utilisez Vitest pour exécuter les tests unitaires et vérifier le bon fonctionnement du projet :

``` sh
pnpm run test
```

Structure du projet

- **index.js** : Contient la logique principale du projet (classes User, Item, ToDoList, EmailSenderService).
- **index.test.js*** : Contient les tests unitaires pour valider les fonctionnalités.
- **README.md** : Documentation du projet.

Exemple d’utilisation

Voici un exemple de création d’un utilisateur et d’une ToDoList :

```js
const { User, Item, ToDoList } = require("./index.js")

const user = new User("test@example.com", "John", "Doe", "Password123", 20)

if (user.isValid()) {
  const todoList = new ToDoList(user);
  todoList.addItem(new Item("Task1", "Faire les courses"))
  console.log(todoList.items);
}
````

Technologies utilisées

- **JavaScript** : Langage principal du projet.
- **Vitest** : Outil pour les tests unitaires.
