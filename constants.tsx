import React from 'react';
import { QuestionMCQ, QuestionSpectrum, BadgeResult } from './types';
import { Sun, CloudFog, Lock, Tornado } from 'lucide-react';

export const PART1_QUESTIONS: QuestionMCQ[] = [
  {
    id: 1,
    question: "Ton/ta partenaire veut t'accompagner partout, même à tes rendez-vous personnels.",
    options: [
      { id: 'A', text: "C'est adorable, il/elle veut vraiment partager ma vie.", score: 0 },
      { id: 'B', text: "Je me sens soutenu(e), c'est une preuve d'engagement.", score: 1 },
      { id: 'C', text: "Ça m'étouffe un peu, j'ai besoin de mon propre espace.", score: 2 },
      { id: 'D', text: "Je ne peux plus rien faire seul(e) sans qu'il/elle soit vexé(e).", score: 3 },
    ],
  },
  {
    id: 2,
    question: "Tu as passé une excellente soirée avec tes amis sans ton/ta partenaire.",
    options: [
      { id: 'A', text: "Il/Elle est ravi(e) pour moi et veut que je raconte les détails.", score: 0 },
      { id: 'B', text: "Il/Elle fait semblant d'être content(e) mais me lance des piques après.", score: 2 }, // Increased score for passive aggressive
      { id: 'C', text: "Il/Elle m'a envoyé des messages toute la soirée pour savoir quand je rentrais.", score: 2 },
      { id: 'D', text: "Il/Elle a eu un \"problème urgent\" pile au moment où je m'amusais.", score: 3 },
    ],
  },
  {
    id: 3,
    question: "Quand vous n'êtes pas d'accord sur un choix (film, restaurant, projet) :",
    options: [
      { id: 'A', text: "On discute et on finit par trouver un compromis.", score: 0 },
      { id: 'B', text: "Je cède souvent parce que je déteste les conflits.", score: 1 },
      { id: 'C', text: "Il/Elle finit toujours par me convaincre que son idée est la meilleure.", score: 2 },
      { id: 'D', text: "Si je ne suis pas d'accord, l'ambiance devient glaciale pendant des heures.", score: 3 },
    ],
  },
  {
    id: 4,
    question: "Ton/ta partenaire fait une critique sur ton apparence juste avant de sortir.",
    options: [
      { id: 'A', text: "C'est juste un conseil, je ne le prends pas mal.", score: 0 },
      { id: 'B', text: "Il/Elle dit que c'est pour me \"protéger\" du regard des autres.", score: 2 },
      { id: 'C', text: "Je finis par me changer car je perds confiance en moi.", score: 2 },
      { id: 'D', text: "Il/Elle ne me complimente que quand je m'habille selon ses goûts.", score: 3 },
    ],
  },
  {
    id: 5,
    question: "À quelle fréquence dois-tu justifier tes dépenses ou ton emploi du temps ?",
    options: [
      { id: 'A', text: "Jamais, la confiance est totale entre nous.", score: 0 },
      { id: 'B', text: "Rarement, seulement pour les grosses décisions communes.", score: 0 },
      { id: 'C', text: "Souvent, il/elle dit qu'on doit être \"transparents\" sur tout.", score: 2 },
      { id: 'D', text: "Tout le temps, je dois presque demander la permission pour tout.", score: 3 },
    ],
  },
  {
    id: 6,
    question: "Comment réagit-il/elle quand tu réussis quelque chose de mieux que lui/elle ?",
    options: [
      { id: 'A', text: "Il/Elle fête ça avec moi, c'est une joie partagée.", score: 0 },
      { id: 'B', text: "Il/Elle sourit mais ramène tout de suite la conversation sur lui/elle.", score: 1 },
      { id: 'C', text: "Il/Elle minimise mon succès : \"C'était facile, tout le monde peut le faire\".", score: 2 },
      { id: 'D', text: "Il/Elle boude car ma réussite le/la rend insécure.", score: 3 },
    ],
  },
  {
    id: 7,
    question: "La notion de vie privée (Privacy) :",
    options: [
      { id: 'A', text: "On ne connaît pas nos codes de téléphone, c'est mon jardin secret.", score: 0 },
      { id: 'B', text: "On a les codes \"au cas où\", mais on respecte l'intimité de l'autre.", score: 0 },
      { id: 'C', text: "Il/Elle fouille parfois mon téléphone à cause de ses doutes.", score: 2 },
      { id: 'D', text: "On partage tout, avoir un secret est vu comme une trahison.", score: 3 },
    ],
  },
  {
    id: 8,
    question: "Le partage des efforts :",
    options: [
      { id: 'A', text: "On partage tout équitablement selon nos moyens.", score: 0 },
      { id: 'B', text: "Il/Elle \"oublie\" souvent de s'investir ou de payer sa part.", score: 1 },
      { id: 'C', text: "Il/Elle utilise l'argent ou les services comme un moyen de pression.", score: 2 },
      { id: 'D', text: "Je me sens coupable de dépenser du temps ou de l'argent pour moi.", score: 3 },
    ],
  },
  {
    id: 9,
    question: "Après une dispute, qui s'excuse le plus souvent ?",
    options: [
      { id: 'A', text: "On s'excuse tous les deux quand on reconnaît nos torts.", score: 0 },
      { id: 'B', text: "Celui qui veut calmer le jeu plus vite, et c'est souvent moi.", score: 1 },
      { id: 'C', text: "Je m'excuse même sans être fautif(ve), juste pour arrêter le conflit.", score: 2 },
      { id: 'D', text: "Il/Elle ne s'excuse jamais, c'est toujours présenté comme \"ma faute\".", score: 3 },
    ],
  },
  {
    id: 10,
    question: "\"Prioriser son partenaire\" :",
    options: [
      { id: 'A', text: "C'est important, mais je garde mes propres passions.", score: 0 },
      { id: 'B', text: "J'ai arrêté certaines activités pour passer plus de temps avec lui/elle.", score: 1 },
      { id: 'C', text: "Mes amis me disent qu'ils ne me voient plus du tout.", score: 2 },
      { id: 'D', text: "Je me sens mal si je fais une activité qui ne l'inclut pas.", score: 3 },
    ],
  },
];

export const PART2_QUESTIONS: QuestionSpectrum[] = [
  { id: 1, leftLabel: "On s'encourage à évoluer séparément", rightLabel: "On veut que l'autre reste identique" },
  { id: 2, leftLabel: "Les désaccords sont calmes et constructifs", rightLabel: "Les cris sont vus comme de la passion" },
  { id: 3, leftLabel: "Je me sens libre de dire non", rightLabel: "Dire non déclenche une punition (silence)" },
  { id: 4, leftLabel: "On respecte mon passé et mes amitiés", rightLabel: "Mon passé est utilisé contre moi" },
  { id: 5, leftLabel: "Le temps de qualité est naturel et joyeux", rightLabel: "Le temps ensemble est une obligation" },
  { id: 6, leftLabel: "Je me sens en sécurité émotionnelle", rightLabel: "Je surveille mes mots pour éviter une crise" },
  { id: 7, leftLabel: "Il/Elle me pousse à donner le meilleur", rightLabel: "Il/Elle me fait croire que je suis nul(le) sans lui" },
  { id: 8, leftLabel: "On partage sans compter les points", rightLabel: "Chaque faveur est une dette à rembourser" },
  { id: 9, leftLabel: "La jalousie est absente ou discutée", rightLabel: "La jalousie est la preuve du vrai amour" },
  { id: 10, leftLabel: "On rit ensemble de nos erreurs", rightLabel: "L'humour est souvent moqueur et blessant" },
];

export const BADGES: BadgeResult[] = [
  {
    id: 'eden',
    title: "L'Éden Lumineux",
    description: "Ta relation est un espace de liberté. Tu respires, tu grandis et tu es respecté(e). C'est le modèle d'une relation saine.",
    color: "from-teal-400 to-emerald-600",
    iconName: 'Sun',
    minScore: 0,
    maxScore: 15
  },
  {
    id: 'labyrinthe',
    title: "Le Labyrinthe Rose",
    description: "C'est très romantique, mais attention à ne pas te perdre. La fusion est belle, mais ne laisse pas ton identité disparaître.",
    color: "from-pink-400 to-rose-500",
    iconName: 'CloudFog',
    minScore: 16,
    maxScore: 30
  },
  {
    id: 'cage',
    title: "La Cage Dorée",
    description: "Attention ! La toxicité est présente, masquée par des preuves d'affection. Le contrôle n'est pas de l'amour, c'est une prison.",
    color: "from-orange-400 to-red-600",
    iconName: 'Lock',
    minScore: 31,
    maxScore: 45
  },
  {
    id: 'vortex',
    title: "Le Vortex Noir",
    description: "Danger. Tu es dans une situation de manipulation et de surveillance. Ta santé mentale est en jeu, il est temps de réagir.",
    color: "from-gray-700 to-black",
    iconName: 'Tornado',
    minScore: 46,
    maxScore: 100 // High cap to catch everything
  }
];

export const getIcon = (name: string, className?: string) => {
  const props = { className: className || "w-6 h-6" };
  switch (name) {
    case 'Sun': return <Sun {...props} />;
    case 'CloudFog': return <CloudFog {...props} />;
    case 'Lock': return <Lock {...props} />;
    case 'Tornado': return <Tornado {...props} />;
    default: return <Sun {...props} />;
  }
}