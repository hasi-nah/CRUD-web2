import express, { Request, Response, NextFunction } from 'express';
import { Etudiant } from './types.js';

const app = express();

app.use(express.json());

let etudiants: Etudiant[] = [
  { id: 1, nom: 'Rabe', prenom: 'Soa', age: 20 },
  { id: 2, nom: 'Rakoto', prenom: 'Koto', age: 22 }
];


app.get('/etudiants', (req: Request, res: Response) => {
  res.status(200).json(etudiants);
});


app.get('/etudiants/:id', (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id as string, 10); // Ajout de "as string"
  const etudiant = etudiants.find((e) => e.id === id);

  if (!etudiant) {
    const error: any = new Error('Étudiant non trouvé');
    error.status = 404;
    return next(error);
  }

  res.status(200).json(etudiant);
});


app.post('/etudiants', (req: Request, res: Response, next: NextFunction) => {
  const { nom, prenom, age } = req.body;

  if (!nom || !prenom || age === undefined) {
    const error: any = new Error('Champs manquants : nom, prenom et age sont requis');
    error.status = 400;
    return next(error);
  }

  const newEtudiant: Etudiant = {
    id: etudiants.length > 0 ? Math.max(...etudiants.map(e => e.id)) + 1 : 1,
    nom,
    prenom,
    age
  };

  etudiants.push(newEtudiant);
  res.status(201).json(newEtudiant);
});


app.put('/etudiants/:id', (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id as string, 10); // Ajout de "as string"
  const index = etudiants.findIndex((e) => e.id === id);

  if (index === -1) {
    const error: any = new Error('Étudiant non trouvé');
    error.status = 404;
    return next(error);
  }

  const { nom, prenom, age } = req.body;
  if (!nom || !prenom || age === undefined) {
    const error: any = new Error('Modification complète requise : nom, prenom et age doivent être fournis');
    error.status = 400;
    return next(error);
  }

  etudiants[index] = { id, nom, prenom, age };
  res.status(200).json(etudiants[index]);
});


app.patch('/etudiants/:id', (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id as string, 10); // Ajout de "as string"
  const etudiant = etudiants.find((e) => e.id === id);

  if (!etudiant) {
    const error: any = new Error('Étudiant non trouvé');
    error.status = 404;
    return next(error);
  }

  const { nom, prenom, age } = req.body;
  if (nom !== undefined) etudiant.nom = nom;
  if (prenom !== undefined) etudiant.prenom = prenom;
  if (age !== undefined) etudiant.age = age;

  res.status(200).json(etudiant);
});


app.delete('/etudiants/:id', (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id as string, 10); // Ajout de "as string"
  const index = etudiants.findIndex((e) => e.id === id);

  if (index === -1) {
    const error: any = new Error('Étudiant non trouvé');
    error.status = 404;
    return next(error);
  }

  etudiants.splice(index, 1);
  res.status(200).json({ message: `L'étudiant avec l'id ${id} a été supprimé avec succès.` });
});


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message: err.message || 'Erreur interne du serveur'
  });
});

export default app;